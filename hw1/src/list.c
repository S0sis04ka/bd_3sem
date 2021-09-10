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

int compareDates(struct Date* date1, struct Date* date2) {
	if (date1->year == date2->year) {
		if (date1->month == date2->month) {
			return date1->day - date2->day;
		}
		else {
			return date1->month - date2->month;
		}
	}
	else {
		return date1->year - date2->year;
	}
}

int listAdd(struct Node** head, char* surname, char* name, char* fathersname, struct Date* dob) {

	struct Node* cur = *head;
	struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
	newNode->surname = surname;
	newNode->name = name;
	newNode->fathersname = fathersname;
	newNode->dob = dob;

	if (*head == NULL) {
		*head = newNode;
		(*head)->next = NULL;	
		return 1;
	}

	while (cur->next != NULL) {
		if (compareDates(newNode->dob, cur->next->dob) < 0) break;
		cur = cur->next;
	}

	if (cur == *head && (compareDates(newNode->dob, cur->dob) < 0)) {
		newNode->next = cur;
		*head = newNode;
		return 1;
	}

	if (cur->next != NULL) {
		newNode->next = cur->next;
		cur->next = newNode;
		return 1;
	}
	else {
		newNode->next = NULL;
		cur->next = newNode;
		return 1;
	}

	return 0;
}

int printList(struct Node* head) {
	struct Node* cur = head;
	int count = 1;
	printf("%d) %s %d.%d.%d\n", count, cur->surname,cur->dob->day, 
									cur->dob->month, cur->dob->year);
	count++;

	while (cur->next != NULL) {
		cur = cur->next;
		printf("%d) %s %d.%d.%d\n", count, cur->surname, cur->dob->day, 
										cur->dob->month, cur->dob->year);
		count++;
	}
	
	return 1;
}

int listSearch(struct Node* head, struct Date* date) {
	struct Node* cur = head;

	while (cur != NULL) {
		if (compareDates(cur->dob, date) == 0) {
			printf("found\n");
			return 1;
		}
		cur = cur->next;
	}
	printf("not found\n");
	return 0;
}




