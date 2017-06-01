$(function() {

    // NOTE: $.tablesorter.theme.bootstrap is ALREADY INCLUDED in the jquery.tablesorter.widgets.js
    // file; it is included here to show how you can modify the default classes
    $.tablesorter.themes.bootstrap = {
        // these classes are added to the table. To see other table classes available,
        // look here: http://getbootstrap.com/css/#tables
        table        : 'table table-bordered table-striped',
        caption      : 'caption',
        // header class names
        header       : 'bootstrap-header', // give the header a gradient background (theme.bootstrap_2.css)
        sortNone     : '',
        sortAsc      : '',
        sortDesc     : '',
        active       : '', // applied when column is sorted
        hover        : '', // custom css required - a defined bootstrap style may not override other classes
        // icon class names
        icons        : '', // add "icon-white" to make them white; this icon class is added to the <i> in the header
        iconSortNone : 'bootstrap-icon-unsorted', // class name added to icon when column is not sorted
        iconSortAsc  : 'glyphicon glyphicon-chevron-up', // class name added to icon when column has ascending sort
        iconSortDesc : 'glyphicon glyphicon-chevron-down', // class name added to icon when column has descending sort
        filterRow    : '', // filter row class; use widgetOptions.filter_cssFilter for the input/select element
        footerRow    : '',
        footerCells  : '',
        even         : '', // even row zebra striping
        odd          : ''  // odd row zebra striping
    };
    $.tablesorter.addParser({
        // set a unique id
        id: 'data',
        is: function(s, table, cell, $cell) {
            // return false so this parser is not auto detected
            return false;
        },
        format: function(s, table, cell, cellIndex) {
            var $cell = $(cell);
            // I could have used $(cell).data(), then we get back an object which contains both
            // data-lastname & data-date; but I wanted to make this demo a bit more straight-forward
            // and easier to understand.

            // first column (zero-based index) has lastname data attribute
            if (cellIndex === 1) {
                // returns lastname data-attribute, or cell text (s) if it doesn't exist
                return $cell.attr('data-oldprice') || s;
                // third column has date data attribute
            } else if (cellIndex === 2) {
                // return "mm-dd" that way we don't need to use "new Date()" to process it
                return $cell.attr('data-price') || s;
            }

            // return cell text, just in case
            return s;
        },
        // flag for filter widget (true = ALWAYS search parsed values; false = search cell text)
        parsed: false,
        // set type, either numeric or text
        type: 'numeric'
    });
    // call the tablesorter plugin and apply the uitheme widget
    $("table").tablesorter({
        // this will apply the bootstrap theme if "uitheme" widget is included
        // the widgetOptions.uitheme is no longer required to be set
        theme : "bootstrap",

        widthFixed: true,

        headerTemplate : '{content} {icon}', // new in v2.7. Needed to add the bootstrap icon!

        // widget code contained in the jquery.tablesorter.widgets.js file
        // use the zebra stripe widget if you plan on hiding any rows (filter widget)
        widgets : [ "uitheme", "columns", "zebra" ],
        headers: {
            1 : { sorter: 'data' },
            2 : { sorter: 'data' }
        },
        widgetOptions : {
            // using the default zebra striping class name, so it actually isn't included in the theme variable above
            // this is ONLY needed for bootstrap theming if you are using the filter widget, because rows are hidden
            zebra : ["even", "odd"],

            // class names added to columns when sorted
            columns: [ "primary", "secondary", "tertiary" ],

            // reset filters button
            filter_reset : ".reset",

            // extra css class name (string or array) added to the filter element (input or select)
            filter_cssFilter: "form-control",

            // set the uitheme widget to use the bootstrap theme class names
            // this is no longer required, if theme is set
            // ,uitheme : "bootstrap"

        }
    })

});