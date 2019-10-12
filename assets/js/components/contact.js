let contactHTML = '';
contactHTML += '<div class="inner">';
contactHTML += '<section>';
contactHTML += '<form method="POST" action="https://formspree.io/jgarabedian96@gmail.com">';
contactHTML += '<div class="fields">';
contactHTML += '<div class="field half">';
contactHTML += '<label for="name">Name</label>';
contactHTML += '<input type="text" name="name" id="name" />';
contactHTML += '</div>';
contactHTML += '<div class="field half">';
contactHTML += '<label for="email">Email</label>';
contactHTML += '<input type="text" name="email" id="email" />';
contactHTML += '</div>';
contactHTML += '<div class="field">';
contactHTML += '<label for="message">Message</label>';
contactHTML += '<textarea name="message" id="message" rows="6"></textarea>';
contactHTML += '</div>';
contactHTML += '</div>';
contactHTML += '<ul class="actions">';
contactHTML += '<li><input type="submit" value="Send Message" class="primary" /></li>';
contactHTML += '<li><input type="reset" value="Clear" /></li>';
contactHTML += '</ul>';
contactHTML += '</form>';
contactHTML += '</section>';

contactHTML += '<section class="split">';
contactHTML += '<section>';
contactHTML += '<div class="contact-method">';
contactHTML += '<span class="icon solid alt fa-envelope"></span>';
contactHTML += '<h3>Email</h3>';
contactHTML += '<a href="#">jgarabedian96@gmail.com</a>';
contactHTML += '</div>';
contactHTML += '</section>';
contactHTML += '</section>';
contactHTML += '</div>';
contactHTML += '</section>';

document.getElementById('contact').innerHTML = contactHTML;



{/* <section>
    <div class="contact-method">
        <span class="icon solid alt fa-phone"></span>
        <h3>Phone</h3>
        <span>(000) 000-0000 x12387</span>
    </div>
</section>
    <section>
        <div class="contact-method">
            <span class="icon solid alt fa-home"></span>
            <h3>Address</h3>
            <span>1234 Somewhere Road #5432<br />
                Nashville, TN 00000<br />
                United States of America</span>
        </div>
    </section> */}