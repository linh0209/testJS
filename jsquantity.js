$(document).ready(function () {
    $('.btn-plus, .btn-minus').on('click', function (e) {
        const isNegative = $(e.target).closest('.btn-minus').is('.btn-minus');
        const input = $(e.target).closest('.content-detail__qty').find('input');
        if (input.is('input')) {
            input[0][isNegative ? 'stepDown' : 'stepUp']();
        }
        $('#addToCard').prop('disabled',
            Number($('.input_qty').val()) < 1 ||
            Number($('.input_qty').val()) > Number($('.input_qty').attr('max'))
        );
    });

    $(document).on('change', '#input_quantity', function () {
        var number = parseInt($(this).val());
        var max = parseInt($(this).attr('max'));
        if (number > max) {
            $(this).val(max);
        }
    });

    // Handle input manual
    $(document).on('change', '.input_qty', function () {
        var qty = $(this).val();
        $('#addToCard').prop(
            'disabled',
            Number(qty) < 1 || Number(qty) > Number($(this).attr('max'))
        );
    });

    const swiper = new Swiper('.block-image__small', {
        // Default parameters
        slidesPerView: 4,
        spaceBetween: 12,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    });

    $('.add-to-cart').on('click', function () {
        var url = $('#addCart').val();
        var productID = $(this).data('pid');
        var qty = $('.input_qty').val();

        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            data: { pid: productID, quantity: qty },
            success: function (data) {
                if (!data.error) {
                    window.location.href = $('#checkout').val();
                }
            },
            error: function () {}
        });
    });
}); 