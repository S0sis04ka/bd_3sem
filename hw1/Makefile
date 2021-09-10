INC_DIR = include
CFLAGS=  -Wall -I$(INC_DIR)

all: lab1

lab1: lab1.o list.o unitTests.o include/list.h
	gcc $(CFLAGS) bin/lab1.o bin/list.o bin/unitTests.o -o lab1

lab1.o: src/lab1.c | bin 
	gcc -c $(CFLAGS) src/lab1.c -o bin/lab1.o

list.o: src/list.c | bin 
	gcc -c $(CFLAGS) src/list.c -o bin/list.o

unitTests.o: src/unitTests.c | bin
	gcc -c $(CFLAGS) src/unitTests.c -o bin/unitTests.o

clean:
	rm -rf bin lab1

bin:
	mkdir bin