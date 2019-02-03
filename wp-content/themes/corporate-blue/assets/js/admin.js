jQuery(document).ready(function($) {

    /********* Multi Input Custom control ***********/
    $( document ).on( 'click', '.widget_multi_add_field', corporate_blue_widget_multi_add_field )
        .on( 'change', '.widget_multi_single_field', corporate_blue_widget_multi_single_field )
        .on( 'click', '.widget_multi_remove_field', corporate_blue_widget_multi_remove_field )

    function corporate_blue_set_multi_add_field() {
        $( '.widget_multi_input' ).each(function() {
            var $this = $( this );
            var multi_saved_value = $this.find( '.widget_multi_value_field' ).val();
            if (multi_saved_value.length > 0) {
                var multi_saved_values = multi_saved_value.split( "|" );
                $this.find( '.widget_multi_fields' ).empty();
                var $control = $this.parents( '.widget_multi_input' );
                $.each(multi_saved_values, function( index, value ) {
                    $this.find( '.widget_multi_fields' ).append( '<div class="set"><input type="text" value="' + value + '" class="widget_multi_single_field" /><span class="widget_multi_remove_field"><span class="dashicons dashicons-no-alt"></span></span></div>' );
                });
            }
        });
    }
    corporate_blue_set_multi_add_field();
    
    function corporate_blue_widget_multi_add_field(e) {
        var $this = $( e.currentTarget );
        e.preventDefault();
            var $control = $this.parents( '.widget_multi_input' );
            $control.find( '.widget_multi_fields' ).append( '<div class="set"><input type="text" value="" class="widget_multi_single_field" /><span class="widget_multi_remove_field"><span class="dashicons dashicons-no-alt"></span></span></div>' );
            corporate_blue_widget_multi_write( $control );
    }

    function corporate_blue_widget_multi_single_field() {
        var $control = $( this ).parents( '.widget_multi_input' );
        corporate_blue_widget_multi_write( $control );
    }

    function corporate_blue_widget_multi_remove_field(e) {
        e.preventDefault();
        var $this = $( this );
        var $control = $this.parents( '.widget_multi_input' );
        $this.parent().remove();
        corporate_blue_widget_multi_write( $control );
    }

    function corporate_blue_widget_multi_write( $element) {
        var widget_multi_val = '';
        $element.find( '.widget_multi_fields .widget_multi_single_field' ).each(function() {
            widget_multi_val += $( this ).val() + '|';
        });
        $element.find( '.widget_multi_value_field' ).val( widget_multi_val.slice( 0, -1 ) ).change();
    }

    $(document).on("click", ".corporate-blue-accordion", function (e) {
        e.preventDefault();
        var $button = $(this);

        $button.next('.corporate-blue-panel').slideToggle();
    
    });

    $(document).on("click", ".upload_image_button", function (e) {
        e.preventDefault();
        var $button = $(this);
 
        // Create the media frame.
        var file_frame = wp.media.frames.file_frame = wp.media({
            title: 'Select or upload image',
            library: { // remove these to show all
                type: 'image' // specific mime
            },
            button: {
                text: 'Select'
            },
            multiple: false  // Set to true to allow multiple files to be selected
        });
 
        // When an image is selected, run a callback.
        file_frame.on('select', function () {
            // We set multiple to false so only get one image from the uploader
            var attachment = file_frame.state().get('selection').first().toJSON();
 
            $button.prev('input').val(attachment.url);
 
        });
 
        // Finally, open the modal
        file_frame.open();
    });

    function corporate_blue_contentTypeChange() {
        $( '.content-type' ).on( 'change', function() {
            var $this = $( this );
            var parent = $this.parent().parent();
            var block = parent.find( '.block' );
            var same = parent.find( '.'+ $this.val() );
            block.removeClass( 'block' ).addClass( 'none' );
            same.removeClass( 'none' ).addClass( 'block' );
        } );
    }
    corporate_blue_contentTypeChange();

    function corporate_blue_widget_chosen() {
        $(".corporate-blue-widget-chosen-select").chosen({
            width: "100%"
        });
    }
    corporate_blue_widget_chosen();

    $(document).on('widget-updated widget-added', function(){

        // icon picker
        $('.corporate-blue-icon-picker').each( function() {
            $(this).iconpicker( '#' + this.id );
        } );

        corporate_blue_widget_chosen();

        corporate_blue_contentTypeChange();

        corporate_blue_set_multi_add_field();
    });
});
