#include <stdio.h>
#include <assert.h>
#include <string.h>
#include "list.h"

// struct Node* testNode = NULL;
// struct Date* testDate = (struct Date*)malloc(sizeof(struct Date));
// testDate->day = 0;
// testDate->month = 0;
// testDate->year = 0;

// testNode->name = "n";
// testNode->surname = "s";
// testNode->fathersname = "f";


int listAdd_addingFirstEll_returnValidStr() {
	struct Node* list = NULL;
	struct Date* date = (struct Date*)malloc(sizeof(struct Date));
	date->day = 1;
	date->month = 1;
	date->year = 1;

	char name[15] = "name";
	char surname[15] = "surname";
	char fathersname[15] = "fath";

	listAdd(&list, surname, name, fathersname, date);

	assert(list != NULL);
	assert(list->surname == surname);
	assert(list->name == name);
	assert(list->fathersname == fathersname);
	assert(list->dob == date);

	return 1;
}

int listAdd_addingInTheEnd_returnValidStr() {
	struct Node* list = NULL;
	struct Date* date = (struct Date*)malloc(sizeof(struct Date));
	date->day = 1;
	date->month = 1;
	date->year = 1;

	char name[15] = "kek";
	char surname[15] = "lul";
	char fathersname[15] = "uwu";

	struct Node* node1 = (struct Node*)malloc(sizeof(struct Node));
	node1->dob = (struct Date*)malloc(sizeof(struct Date));
	node1->dob->day = 1;
	node1->dob->month = 1;
	node1->dob->year = 1000;
	node1->name = (char*)malloc(sizeof(char) * 50);
	node1->surname = (char*)malloc(sizeof(char) * 50);
	node1->fathersname = (char*)malloc(sizeof(char) * 50);
	strcpy(node1->name, "kkk");
	strcpy(node1->surname, "www");
	strcpy(node1->fathersname, "uwu");
	node1->next = NULL;

	listAdd(&list, surname, name, fathersname, date);
	listAdd(&list, node1->surname, node1->name, node1->fathersname, node1->dob);

	assert(list->next != NULL);
	assert(list->next->surname == node1->surname);
	assert(list->next->name == node1->name);
	assert(list->next->fathersname == node1->fathersname);
	assert(list->next->dob == node1->dob);

	return 1;
}

int listAdd_addingFront_returnValidStr() {
	struct Node* list = NULL;
	struct Date* date = (struct Date*)malloc(sizeof(struct Date));
	date->day = 1;
	date->month = 1;
	date->year = 1000;

	char name[15] = "kek";
	char surname[15] = "lul";
	char fathersname[15] = "uwu";

	struct Node* node1 = (struct Node*)malloc(sizeof(struct Node));
	node1->dob = (struct Date*)malloc(sizeof(struct Date));
	node1->dob->day = 1;
	node1->dob->month = 1;
	node1->dob->year = 1;
	node1->name = (char*)malloc(sizeof(char) * 50);
	node1->surname = (char*)malloc(sizeof(char) * 50);
	node1->fathersname = (char*)malloc(sizeof(char) * 50);
	strcpy(node1->name, "kkk");
	strcpy(node1->surname, "www");
	strcpy(node1->fathersname, "uwu");
	node1->next = NULL;

	listAdd(&list, surname, name, fathersname, date);
	listAdd(&list, node1->surname, node1->name, node1->fathersname, node1->dob);

	assert(list != NULL);
	assert(list->surname == node1->surname);
	assert(list->name == node1->name);
	assert(list->fathersname == node1->fathersname);
	assert(list->dob == node1->dob);

	return 1;
}

int listSearch_dateInList_returnTrue() {
	struct Node* list = NULL;
	struct Date* date = (struct Date*)malloc(sizeof(struct Date));
	date->day = 1;
	date->month = 1;
	date->year = 1000;
	char name[15] = "kek";
	char surname[15] = "lul";
	char fathersname[15] = "uwu";

	struct Date* fdate = (struct Date*)malloc(sizeof(struct Date));
	fdate->day = 1;
	fdate->month = 1;
	fdate->year = 1000;

	listAdd(&list, surname, name, fathersname, date);

	assert(listSearch(list, fdate));

	return 1;

}

int listSearch_dateNotList_returnFalse() {
	struct Node* list = NULL;
	struct Date* date = (struct Date*)malloc(sizeof(struct Date));
	date->day = 1;
	date->month = 1;
	date->year = 1000;
	char name[15] = "kek";
	char surname[15] = "lul";
	char fathersname[15] = "uwu";

	struct Date* fdate = (struct Date*)malloc(sizeof(struct Date));
	fdate->day = 1;
	fdate->month = 1;
	fdate->year = 0;

	listAdd(&list, surname, name, fathersname, date);

	assert(!listSearch(list, fdate));

	return 1;

}
