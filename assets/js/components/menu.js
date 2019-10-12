let menuHTML = '<div class="inner">';
menuHTML += '<ul class="links">';
menuHTML += '<li><a href="index.html">Home</a></li>';
menuHTML += '<li><a href="landing.html">Landing</a></li>';
menuHTML += '<li><a href="generic.html">Generic</a></li>';
menuHTML += '<li><a href="elements.html">Elements</a></li>';
menuHTML += '</ul>';
menuHTML += '<ul class="actions stacked">';
menuHTML += '<li><a href="#" class="button primary fit">Get Started</a></li>';
menuHTML += '<li><a href="#" class="button fit">Log In</a></li>';
menuHTML += '</ul>';
menuHTML += '</div>';

document.getElementById('menu').innerHTML = menuHTML;