<h1>This is the personal budget project for Codecademy!</h1>
<h2>Commands</h2>
<h3>GET '/envelops'</h3>
    <p>This gets all the envelopes from the database</p>
<h3>GET '/envelops/:id'</h3>
    <p>This gets the envelope with the corresponsing id number</p>
<h3>POST '/envelope'</h3>
    <p>This requires two query values, being the category(string) and budget(number)</p>
<h3>DELETE '/envelope/:id'</h3>
    <p>This deletes the envelope with the corresponding id from the database</p>
<h3>PUT '/envelope/:id'</h3>
    <p>This takes upto two query values, being category(string) and budget(number) and updates the envelope with the corresponding id number</p>
<h3>PUT '/envelope/:id/:id2</h3>
    <p>This moves all of the remaining budget in one envelope (id) to another (id2)</p>