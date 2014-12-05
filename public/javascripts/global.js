// Articlelist data array for filling in info box
var articleListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the article table on initial page load
    populateTable();

    // Articlename link click
    $('#articleList table tbody').on('click', 'td a.linkshowarticle', showArticleInfo);

    // Add Article button click
    $('#btnAddArticle').on('click', addArticle);

    // Update Article link click
    $('#articleList table tbody').on('click', 'td a.linkupdatearticle', updateArticle);

    // Delete Article link click
    $('#articleList table tbody').on('click', 'td a.linkdeletearticle', deleteArticle);

    // New Article link click
    $('#addnewlink').on('click', newArticle);
});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/articles/articlelist', function( data ) {

        // Stick our article data array into a articlelist variable in the global object
        articleListData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowarticle" rel="' + this.title + '" title="Show Details">' + this.title + '</a></td>';
            tableContent += '<td>' + this.author + '</td>';
            tableContent += '<td><a href="#" class="linkupdatearticle" rel="' + this.title + '">update</a></td>';
            tableContent += '<td><a href="#" class="linkdeletearticle" rel="' + this.id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#articleList table tbody').html(tableContent);
    });
};

// Show Article Info
function showArticleInfo(event) {
    
    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve articlename from link rel attribute
    var thisArticleId = $(this).attr('rel');
    
    // Get Index of object based on id value
    var arrayPosition = articleListData.map(function(arrayItem) { return arrayItem.title; }).indexOf(thisArticleId);
    
    // Get our Article Object
    var thisArticleObject = articleListData[arrayPosition];
    
    //Populate Info Box
    $('#articleTitle').text(thisArticleObject.title);
    $('#articleBody').text(thisArticleObject.body);
    $('#articleAuthor').text(thisArticleObject.author);
};

// Show Article Info
function updateArticle(event) {
    
    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve articlename from link rel attribute
    var thisArticleId = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = articleListData.map(function(arrayItem) { return arrayItem.title; }).indexOf(thisArticleId);

    // Get our Article Object
    var thisArticleObject = articleListData[arrayPosition];

    //Populate Info Box
    $('#inputArticleTitle').val(thisArticleObject.title);
    $('#inputArticleBody').val(thisArticleObject.body);
    $('#inputArticleAuthor').val(thisArticleObject.author);
    $('#inputArticleId').val(thisArticleObject.id);
    $('#btnAddArticle').html('Update Article');
    $('#formtitle').html("Update Article");
    $('#addnewlink').show();
};

// Reset Article Info
function newArticle(event) {
    
    resetForm();
};

function resetForm()
{
    //Reset Info Box
    $('#inputArticleTitle').val('');
    $('#inputArticleBody').val('');
    $('#inputArticleAuthor').val('');
    $('#inputArticleId').val(0);
    $('#btnAddArticle').html('Add Article');
    $('#formtitle').html("New Article");
    $('#addnewlink').hide();
}

// Add Article
function addArticle(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addArticle input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all article info into one object
        var newArticle = {
            'id': $('input#inputArticleId').val(),
            'title': $('input#inputArticleTitle').val(),
            'body': $('input#inputArticleBody').val(),
            'author': $('input#inputArticleAuthor').val()
        }
        // Use AJAX to post the object to our addarticle service
        $.ajax({
            type: 'POST',
            data: newArticle,
            url: '/articles/addarticle',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {
                // Clear the form inputs
                $('#addArticle fieldset input').val('');

                // Update the table
                populateTable();
                resetForm();
            }
            else {
                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);
            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

// Delete Article
function deleteArticle(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this article?');

    // Check and make sure the article confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/articles/deletearticle/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                console.log(response);
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;
    }

};