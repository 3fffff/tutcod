#include "iostream.h"

using namespace std;

void main(){
    int T,N;
    string Input,Output;
    cin>> T;
    cin>>N;
    for(int start=0;start<N;start++){
        vector<bool>vis(n);
        vis[start] = true;
        for(int i=0;i<<N;i++){
            for(int j=0;j<N;j++){
                if(out[j]=='Y'){
                    if(j && Input[j-1]=='Y'){	
                        vis[j-1] = true;
                    }
                    if(j<n-1&&Input[j-1]=='Y'){
                        vis[j+1] = true;
                    }
                }
            }
        }
        for(int i=0;i<N;i++){
            cout<< vis[i]?"Y":""N";
        }
    }
}
