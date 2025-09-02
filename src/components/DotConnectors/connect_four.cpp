#include <bits/stdc++.h>
using namespace std;

const int ROWS = 6;
const int COLS = 7;
const char HUMAN = 'X';
const char AI = 'O';
vector<vector<char>> board(ROWS, vector<char>(COLS, ' '));

void print_board() {
    cout << "Human: X, AI: O\n";
    cout << "Current Board:\n";
    cout << "\n";
    for (int r = 0; r < ROWS; r++) {
        cout << "| ";
        for (int c = 0; c < COLS; c++) {
            cout << board[r][c] << " | ";
        }
        cout << "\n";
    }
    cout << "-----------------------------\n";
    cout << "  1   2   3   4   5   6   7  \n\n";
}

bool is_valid_move(int col) {
    return board[0][col] == ' ';
}

int get_next_row(int col) {
    for (int r = ROWS - 1; r >= 0; r--) {
        if (board[r][col] == ' ') return r;
    }
    return -1;
}

bool check_winner(char player) {
    // Horizontal
    for (int r = 0; r < ROWS; r++) {
        for (int c = 0; c < COLS - 3; c++) {
            if (board[r][c] == player && board[r][c+1] == player && board[r][c+2] == player && board[r][c+3] == player)
                return true;
        }
    }
    // Vertical
    for (int c = 0; c < COLS; c++) {
        for (int r = 0; r < ROWS - 3; r++) {
            if (board[r][c] == player && board[r+1][c] == player && board[r+2][c] == player && board[r+3][c] == player)
                return true;
        }
    }
    // Right tilt diagonal
    for (int r = 3; r < ROWS; r++) {
        for (int c = 0; c < COLS - 3; c++) {
            if (board[r][c] == player && board[r-1][c+1] == player && board[r-2][c+2] == player && board[r-3][c+3] == player)
                return true;
        }
    }
    // Left tilt diagonal
    for (int r = 0; r < ROWS - 3; r++) {
        for (int c = 0; c < COLS - 3; c++) {
            if (board[r][c] == player && board[r+1][c+1] == player && board[r+2][c+2] == player && board[r+3][c+3] == player)
                return true;
        }
    }
    return false;
}

bool is_board_full() {
    for (int c = 0; c < COLS; c++) {
        if (board[0][c] == ' ') return false;
    }
    return true;
}

int evaluate_window(vector<char> window, char player) {
    int score = 0;
    char opp = (player == HUMAN) ? AI : HUMAN;

    int countPlayer = count(window.begin(), window.end(), player);
    int countEmpty = count(window.begin(), window.end(), ' ');
    int countOpp = count(window.begin(), window.end(), opp);

    if (countPlayer == 4) score += 100;
    else if (countPlayer == 3 && countEmpty == 1) score += 10;
    else if (countPlayer == 2 && countEmpty == 2) score += 5;

    if (countOpp == 3 && countEmpty == 1) score -= 8;

    return score;
}

int evaluate_board() {
    int score = 0;

    // Score center column
    vector<char> center_col;
    for (int r = 0; r < ROWS; r++) center_col.push_back(board[r][COLS/2]);
    score += count(center_col.begin(), center_col.end(), AI) * 3;

    // Score Horizontal
    for (int r = 0; r < ROWS; r++) {
        for (int c = 0; c < COLS - 3; c++) {
            vector<char> window = {board[r][c], board[r][c+1], board[r][c+2], board[r][c+3]};
            score += evaluate_window(window, AI);
        }
    }
    // Score Vertical
    for (int c = 0; c < COLS; c++) {
        for (int r = 0; r < ROWS - 3; r++) {
            vector<char> window = {board[r][c], board[r+1][c], board[r+2][c], board[r+3][c]};
            score += evaluate_window(window, AI);
        }
    }
    // Score right tilt diagonal
    for (int r = 3; r < ROWS; r++) {
        for (int c = 0; c < COLS - 3; c++) {
            vector<char> window = {board[r][c], board[r-1][c+1], board[r-2][c+2], board[r-3][c+3]};
            score += evaluate_window(window, AI);
        }
    }
    // Score left tilt diagonal
    for (int r = 0; r < ROWS - 3; r++) {
        for (int c = 0; c < COLS - 3; c++) {
            vector<char> window = {board[r][c], board[r+1][c+1], board[r+2][c+2], board[r+3][c+3]};
            score += evaluate_window(window, AI);
        }
    }
    return score;
}

int minMax(int depth, int alpha, int beta, bool maximizingPlayer) {
    if (check_winner(HUMAN)) return -1000000;
    if (check_winner(AI)) return 1000000;
    if (depth == 0 || is_board_full()) return evaluate_board();

    if (maximizingPlayer) {
        int maxEval = INT_MIN;
        for (int c = 0; c < COLS; c++) {
            if (is_valid_move(c)) {
                int r = get_next_row(c);
                board[r][c] = AI;
                int eval = minMax(depth - 1, alpha, beta, false);
                board[r][c] = ' ';
                maxEval = max(maxEval, eval);
                alpha = max(alpha, eval);
                if (beta <= alpha) break;
            }
        }
        return maxEval;
    } else {
        int minEval = INT_MAX;
        for (int c = 0; c < COLS; c++) {
            if (is_valid_move(c)) {
                int r = get_next_row(c);
                board[r][c] = HUMAN;
                int eval = minMax(depth - 1, alpha, beta, true);
                board[r][c] = ' ';
                minEval = min(minEval, eval);
                beta = min(beta, eval);
                if (beta <= alpha) break;
            }
        }
        return minEval;
    }
}

int get_best_move(int depth) {
    int bestScore = INT_MIN;
    int bestCol = 0;
    for (int c = 0; c < COLS; c++) {
        if (is_valid_move(c)) {
            int r = get_next_row(c);
            board[r][c] = AI;
            int score = minMax(depth - 1, INT_MIN, INT_MAX, false);
            board[r][c] = ' ';
            if (score > bestScore) {
                bestScore = score;
                bestCol = c;
            }
        }
    }
    return bestCol;
}

void play_game() {
    // bool turn = true; // true = human, false = AI
    //randomly choose who goes first
    bool turn = (rand() % 2) == 0; // Randomly choose who goes first
    cout << (turn ? "You" : "Computer") << " goes first.\n";
    int level = 3;
    cout << "Choose difficulty level: \n";
    cout << "1. Easy\n2. Medium\n3. Hard\n";
    cout << "Enter your choice: ";
    char choice;
    cin >> choice;

    if(choice == '1') level = 1;
    else if(choice == '2') level = 3;
    else if(choice == '3') level = 7;
    else{
        cout << "Invalid choice. Defaulting to Medium.\n";
        level = 3;
    }

    print_board();
    while (true) {
        if (turn) {
            int col;
            cout << "Your turn! Enter column (1-7): ";
            cin >> col;
            col--; 
            if (!is_valid_move(col)) {
                cout << "Invalid move. Try again.\n";
                continue;
            }
            int row = get_next_row(col);
            board[row][col] = HUMAN;
        } else {
            cout << "Computer's turn...\n";
            int col = get_best_move(level);
            cout << "Computer chose column: " << col+1 << "\n";
            int row = get_next_row(col);
            board[row][col] = AI;
        }
        print_board();

        if (check_winner(HUMAN)) {
            cout << "You win!\n";
            break;
        }
        if (check_winner(AI)) {
            cout << "Computer wins!\n";
            break;
        }
        if (is_board_full()) {
            cout << "Game is a draw.\n";
            break;
        }

        turn = !turn;
    }
}

int main() {
    srand(time(0));
    play_game();
    return 0;
}