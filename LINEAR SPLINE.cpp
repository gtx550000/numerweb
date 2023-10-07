#include<iostream>
#include<math.h>
using namespace std;

int main() {
    int i = 0, n = 0;
    double x = 0, fx = 0;

    cout << "Enter x:";
    cin >> x;
    cout << "Enter point:";
    cin >> n;
    double m[n][2];
    for (i = 0; i < n; i++) 
	{
        cin >> m[i][0];
        cin >> m[i][1];
    }

    for (i = 0; i < n; i++) 
	{
        if (m[i - 1][0] <= x && m[i][0] >= x) 
		{
            fx = m[i - 1][1] + ((m[i][1] - m[i - 1][1]) / (m[i][0] - m[i - 1][0])) * (x - m[i - 1][0]);
        }
    }

    cout << "fx: " << fx;
    return 0;
}

