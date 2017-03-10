with open('out.txt', 'r', encoding='utf-8') as results:
    for line in results:
        pass
    if line[-2] == "2":
        print(100)
    else:
        print(0)
