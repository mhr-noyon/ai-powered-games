#include <bits/stdc++.h>
using namespace std;
#define endl "\n"

// -----------------------------------------------------
//    My first ever AI Agen for Tic - Tac - Toe game
// -----------------------------------------------------
char AI = 'O';
char HUMAN = 'X';

vector<vector<char>> board(4, vector<char>(4, ' '));
void print_board(){
    cout << "Current Board: " << endl;
    for(int j=1;j<=3;j++){
        cout << " ---";
    }
    cout << endl;
    for(int i=1;i<=3;i++){
        cout<< "| ";
        for(int j=1;j<=3;j++){
            cout << board[i][j] << " | ";
        }
        cout<<endl;
        for(int j=1;j<=3;j++){
            cout << " ---";
        }
        cout << endl;
    }
    cout << endl;
}

bool is_game_end(){
    for (int i = 1; i <= 3; i++) {
        for (int j = 1; j <= 3; j++) {
            if (board[i][j] == ' ') {
                return false; 
            }
        }
    }
    return true;
}

bool is_he_win(char player) {
    for (int i = 1; i <= 3; i++) {
        if (board[i][1] == player && board[i][2] == player && board[i][3] == player) return true; // Row
        if (board[1][i] == player && board[2][i] == player && board[3][i] == player) return true; // Column
    }
    if (board[1][1] == player && board[2][2] == player && board[3][3] == player) return true;     // Diagonal
    if (board[1][3] == player && board[2][2] == player && board[3][1] == player) return true;     // Anti-diagonal
    return false;
}


// minMax with alpha-beta pruning
int minMax(int depth, bool isMax, int alpha, int beta) {
    if (is_he_win(HUMAN)) return -10 + depth;
    if (is_he_win(AI)) return 10 - depth;
    if (is_game_end()) return 0;
    if (depth == 0) return 0; 

    if (isMax) {
        int best = INT_MIN;
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 3; j++) {
                if (board[i][j] == ' ') {
                    board[i][j] = AI;
                    int score = minMax(depth - 1, false, alpha, beta);
                    board[i][j] = ' ';
                    best = max(best, score);
                    alpha = max(alpha, best);
                    if (beta <= alpha) return best;
                }
            }
        }
        return best;
    } else {
        int best = INT_MAX;
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 3; j++) {
                if (board[i][j] == ' ') {
                    board[i][j] = HUMAN;
                    int score = minMax(depth - 1, true, alpha, beta);
                    board[i][j] = ' ';
                    best = min(best, score);
                    beta = min(beta, best);
                    if (beta <= alpha) return best;
                }
            }
        }
        return best;
    }
}
void solve()
{
    bool firstAI = true;
    bool humanTurn  = (rand() % (2)) == 0; // Randomly choose who goes first
    if(humanTurn){
        firstAI = false;
        HUMAN = 'O';
        AI = 'X';
    }
    else{
        HUMAN = 'X';
        AI = 'O';
    }

    int x, y;
    cout << "Welcome to Tik - Tac - Toe Game!" << endl;
    cout << "You are playing against the computer." << endl;
    cout << "Choose Difficulty Level: " << endl;
    cout << "1. Easy" << endl;
    cout << "2. Medium" << endl;
    cout << "3. Hard" << endl;
    cout << "Enter your choice: ";
    char choice;
    cin >> choice;
    if (choice < '1' || choice > '3') {
        cout << "Invalid choice. Defaulting to level 2." << endl;
        choice = '2';
    } 

    print_board();
    while(true){
        if(humanTurn){
            // Human's turn
            while(true){
                cout << "You are playing as " << HUMAN << endl;
                cout << "Your turn!" << endl;
                cout << "Enter row and column (1-3): ";
                cin>>x>>y;

                if (x >= 1 && x <= 3 && y >= 1 && y <= 3 && board[x][y] == ' ') {
                    board[x][y] = HUMAN;
                    break;
                }
                cout << "Invalid move. Try again." << endl;
            }
        }
        else if(choice == '1' || firstAI){
            cout << "Computer's turn!" << endl;
            // Randomly choose a move for the computer's first turn
            while(true){
                x = (rand() % 3) + 1;
                y = (rand() % 3) + 1;
                if(board[x][y] == ' '){
                    cout << "Computer chose: " << x << ", " << y << endl;
                    board[x][y] = AI;
                    break;
                }
            }
            firstAI = false;
        }
        else if(choice == '2'){
            cout << "Computer's turn!" << endl;
            bool doMove = true;
            // Check winning move
            for (int i = 1; i <= 3; i++) {
                for (int j = 1; j <= 3; j++) {
                    if (board[i][j] == ' ') {
                        board[i][j] = AI;
                        if (is_he_win(AI)) {
                            cout << "Computer chose: " << i << ", " << j << endl;
                            print_board();
                            cout << "Computer wins!" << endl;
                            return;
                        }
                        board[i][j] = ' ';
                    }
                }
            }
            // Check blocking move
            for (int i = 1; i <= 3; i++) {
                for (int j = 1; j <= 3; j++) {
                    if (board[i][j] == ' ') {
                        board[i][j] = HUMAN;    
                        if (is_he_win(HUMAN)) {
                            double x = static_cast<double>(rand()) / RAND_MAX;
                            if(x < 0.8) doMove = false; // Randomly choose to block or not (80% chance to block)
                            cout<<"rand value: " << x << endl;
                            if (!doMove) {   
                                cout << "Computer chose: " << i << ", " << j << endl;                             
                                board[i][j] = AI;
                                print_board();
                                break;
                            }
                        }
                        if (!doMove) break;
                        board[i][j] = ' ';
                    }
                }
                if (!doMove) break;
            }
            // Randomly choose a move for the computer's first turn
            while(doMove){
                x = (rand() % 3) + 1;
                y = (rand() % 3) + 1;
                if(board[x][y] == ' '){
                    cout << "Computer chose: " << x << ", " << y << endl;
                    board[x][y] = AI;
                    doMove = false;
                }
            }
        }
        else {
            cout << "Computer's turn!" << endl;
            int bestVal = INT_MIN, moveX = -1, moveY = -1;
            for (int i = 1; i <= 3; i++) {
                for (int j = 1; j <= 3; j++) {
                    if (board[i][j] == ' ') {
                        board[i][j] = AI;
                        int moveVal = minMax(3, false, INT_MIN, INT_MAX);
                        board[i][j] = ' ';
                        if (moveVal > bestVal) {
                            bestVal = moveVal;
                            moveX = i;
                            moveY = j;
                        }
                    }
                }
            }
            cout << "Computer chose: " << moveX << ", " << moveY << endl;
            board[moveX][moveY] = AI;
        }
        
        print_board();
        if (is_he_win(HUMAN)) {
            cout << "You win!" << endl;
            break;
        }
        if (is_he_win(AI)) {
            cout << "Computer wins!" << endl;
            break;
        }
        if (is_game_end()) {
            cout << "It's a draw!" << endl;
            break;
        }
        humanTurn = !humanTurn; // Switch turns
    }
}

int main(){
    srand(time(0));
    solve();
    return 0;
}