#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include "list.h"
#include "unitTests.h"

int main(){

	FILE *fin;
	fin = fopen("input.txt", "r");

	struct Node* list = NULL;

	while(!feof(fin)) {
		char* surname = (char*)malloc(sizeof(char) * 15);
		char* name = (char*)malloc(sizeof(char) * 15);
		char* fathersname = (char*)malloc(sizeof(char) * 15);
		struct Date* dob = (struct Date*)malloc(sizeof(struct Date));

		fscanf(fin, "%s%s%s", surname, name, fathersname);
		fscanf(fin, "%d.%d.%d", &dob->day, &dob->month, &dob->year);

		listAdd(&list, surname, name, fathersname, dob);
	}

	fclose(fin);

	listAdd_addingFirstEll_returnValidStr();
	listAdd_addingInTheEnd_returnValidStr();
	listAdd_addingFront_returnValidStr();
	listSearch_dateInList_returnTrue();
	listSearch_dateNotList_returnFalse();

	printList(list);
	//struct Date* date = (struct Date*)malloc(sizeof(struct Date));
	//fscanf(stdin, "%d.%d.%d", &date->day, &date->month, &date->year);
	//listSearch(list, date);

	free(list);

	return 0;
}