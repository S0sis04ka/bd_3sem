#include <stdio.h>
#include <stdlib.h>

struct Date{
	int day;
	int month;
	int year;
};

struct Node
{
	char* surname;
	char* name;
	char* fathersname;
	struct Date* dob;
	struct Node* next;
};

int compareDates(struct Date* date1, struct Date* date2);
struct Node* listAdd(struct Node** head, char* surname, char* name, char* fathersname, struct Date* dob);
int printList(struct Node* head);
int listSearch(struct Node* head, struct Date* date);