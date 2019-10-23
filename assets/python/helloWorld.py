from browser import document, alert

def echo(ev):
    alert("Hello {} !".format(document["name-input"].value))

def enterkey(ev):
    print(ev.which)
    if ev.which == 13:
        echo(ev)
# Add in event listener
document["name-submit"].bind("click", echo)
document["name-input"].bind("keypress", enterkey)