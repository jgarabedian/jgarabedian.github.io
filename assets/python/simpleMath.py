from browser import document, alert
import sys

def add(ev):
    num1 = document["num1-input"].value
    num2 = document["num2-input"].value
    if not num1 or not num2:
        alert("You must enter a number!")
        sys.exit()
    num1 = float(num1)
    num2 = float(num2)
    type = document["math-type"].value
    answer = 0
    if type == "Plus":
        answer = num1 + num2
    elif type == "Minus":
        answer = num1 - num2
    elif type == "Times":
        answer = num1 * num2
    else:
        answer = num1 / num2
    document["answer"].value = answer
    # alert("Your answer is " + str(answer))


document["add-submit"].bind("click", add)
