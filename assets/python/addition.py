from browser import document, alert

def add(ev):
    num1 = int(document["num1-input"].value)
    num2 = int(document["num2-input"].value)
    total = num1 + num2
    alert("Your total is " + str(total))


document["add-submit"].bind("click", add)