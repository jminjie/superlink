walk(document.body);

var hyperlinkStyle;
try {
    hyperlinkStyle = getStyle("a:link").substring(7);
} catch (e) {
    try {
        if (hyperlinkStyle == null) {
            hyperlinkStyle = getStyle("a").substring(2);
        }
    } catch (e) {
        if (hyperlinkStyle == null) {
            // use default hyperlink style
            hyperlinkStyle = "{ color: blue; text-decoration: underline; }";
        }
    }
}
document.styleSheets[0].insertRule("superlink " + hyperlinkStyle, 1);

function walk(node) 
{
	// Based on https://github.com/panicsteve/cloud-to-butt

	var child, next;
	
    if (node.tagName != null) {
        if (node.tagName.toLowerCase() == 'input' || node.tagName.toLowerCase() == 'textarea'
            || node.classList.contains('ace_editor')) {
            return;
        }
    }

	switch ( node.nodeType )  
	{
		case 1:
            if (node.nodeName.toLowerCase() == 'a') {
                superLinkify(node);
                break;
            }
            // intentional fallthrough

		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;
	}
}

function superLinkify(oldNode) {
    if (oldNode != null) {
        var newNode = document.createElement('superlink'),
            node,
            nextNode;

        node = oldNode.firstChild;
        while (node) {
            nextNode = node.nextSibling;
            newNode.appendChild(node);
            node = nextNode;
        }

        newNode.className = oldNode.className;
        newNode.id = oldNode.id;
        if (oldNode.class != null) newNode.class = oldNode.class;
        if (oldNode.title != null) newNode.title = oldNode.title;
        oldNode.parentNode.replaceChild(newNode, oldNode);
    }
}

function getStyle(className) {
    var classes = document.styleSheets[0].rules || document.styleSheets[0].cssRules;
    for (var x = 0; x < classes.length; x++) {
        if (classes[x].selectorText == className) {
            return (classes[x].cssText) ? classes[x].cssText : classes[x].style.cssText;
        }
    }
}

