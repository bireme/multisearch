$(document).ready(function(){
    function getParameters() {
        var searchString = window.location.search.substring(1),
        params = searchString.split("&"),
        hash = {};

        if (searchString == "") return {};
        for (var i = 0; i < params.length; i++) {
            var val = params[i].split("=");
            hash[unescape(val[0])] = unescape(val[1]);
        }
        return hash;
    }

    $('div a#copy-dynamic').zclip({
        path:'js/ZeroClipboard.swf',
        copy:function(){return $('textarea#showSource').val();},
        afterCopy:function(){
            $("#clipboard").stop();
            $("#clipboard").css({ "visibility": "visible" });
            $("#clipboard").css({ "opacity": 1 });
            $("#clipboard").animate({ "opacity": 0 }, 5000);
            $("html, body").animate({ scrollTop: $(document).height()-$(window).height() }, "slow");
        }
    });

    $("#button").click(function () {
        var iahx = $('#inputIAHX').val();
        var url = $('#inputURL').val();
        var site = $('#sitename').val();
        var lang = $('#inputLang').val();

        var param = getParameters();
        if(!param.lang)
            language = "pt";
        else
            language = param.lang;

        var labels = [ "pt", "Pesquisar", "Buscar em:", "Todas as bases de dados", "Páginas do site", "es", "Buscar", "Buscar en:", "Todas las bases de datos", "Páginas del sitio", "en", "Search", "Search in:", "All databases", "Site pages" ];
        var locate = new Array();
        locate.push(labels[jQuery.inArray( lang, labels ) + 1]);
        locate.push(labels[jQuery.inArray( lang, labels ) + 2]);
        locate.push(labels[jQuery.inArray( lang, labels ) + 3]);
        locate.push(labels[jQuery.inArray( lang, labels ) + 4]);
        //locate[locate.length] = labels[jQuery.inArray( lang, labels ) + 1];
        var errors = [ "pt", "Por favor inserir a URL do iAHx.", "Por favor inserir a URL do BVS-Site.", "Por favor inserir o nome do site.", "Por favor escolher o idioma.", "A URL inserida não é válida.", "es", "Por favor introducir la URL del iAHx.", "Por favor introducir la URL del BVS-Sitio.", "Por favor introducir el nombre del sitio.", "Por favor seleccionar el idioma.", "La URL introducida no es válida.", "en", "Please insert the iAHx URL.", "Please insert the BVS-Site URL.", "Please insert the site name.", "Please choose the language.", "Inserted URL is not valid." ];
        var notice = new Array;
        notice.push(errors[jQuery.inArray( language, errors ) + 1]);
        notice.push(errors[jQuery.inArray( language, errors ) + 2]);
        notice.push(errors[jQuery.inArray( language, errors ) + 3]);
        notice.push(errors[jQuery.inArray( language, errors ) + 4]);
        notice.push(errors[jQuery.inArray( language, errors ) + 5]);
        //notice[notice.length] = errors[jQuery.inArray( language, errors ) + 1];

        if(iahx == ""){
            $("#inputIAHX").popover({
                placement : 'right',
                content : notice[0]
            });
            $("#inputIAHX").popover('show');
        }
        if(iahx.substring(0, 7) != "http://"){
            $("#inputIAHX").popover({
                placement : 'right',
                content : notice[4]
            });
            $("#inputIAHX").popover('show');
        }
        if(url == ""){
            $("#inputURL").popover({
                placement : 'right',
                content : notice[1]
            });
            $("#inputURL").popover('show');
        }
        if(url.substring(0, 7) != "http://"){
            $("#inputURL").popover({
                placement : 'right',
                content : notice[4]
            });
            $("#inputURL").popover('show');
        }
        if(site == ""){
            $("#sitename").popover({
                placement : 'right',
                content : notice[2]
            });
            $("#sitename").popover('show');
        }
        if(lang == ""){
            $("#inputLang").popover({
                placement : 'left',
                content : notice[3]
            });
            $("#inputLang").popover('show');
        }

        if ($('.popover').length == 0) {
            var text = "<script src=\"http://reddes.bvsalud.org/support/js/multisearch-widget.js\"></script>\n";
            text = text.concat("<form class=\"vhl-search-form\" action=\"" + iahx + "\" method=\"get\" id=\"searchForm\" onsubmit=\"if(searchForm.q.value=='" + locate[0] + "') searchForm.q.value = '';\">\n");
            text = text.concat("    <input type=\"hidden\" name=\"lang\" value=\"" + lang + "\" />\n");
            text = text.concat("    <input type=\"hidden\" name=\"home_url\" value=\"" + url + "\" />\n");
            text = text.concat("    <input type=\"hidden\" name=\"home_text\" value=\"" + site + "\" />\n");
            text = text.concat("    <label for=\"vhl-search-input\"></label>\n");
            text = text.concat("    <input type=\"text\" id=\"vhl-search-input\" class=\"vhl-search-input\" name=\"q\" placeholder=\"" + locate[0] + "\" value=\"" + locate[0] + "\" onfocus=\"if(this.value=='" + locate[0] + "') this.value = '';\" onblur=\"if(this.value=='') this.value = '" + locate[0] + "';\" />\n");
            text = text.concat("    <input type=\"submit\" class=\"vhl-search-submit submit\" name=\"submit\" value=\"" + locate[0] + "\" />\n");
            text = text.concat("</form>\n");

            text = text.concat("<form style=\"display: none;\" class=\"default-search-form\" role=\"search\" action=\"" + url + "\" method=\"get\" id=\"defaultSearchForm\" onsubmit=\"if(defaultSearchForm.s.value=='" + locate[0] + "') defaultSearchForm.s.value = '';\">\n");
            text = text.concat("    <label for=\"s\"></label>\n");
            text = text.concat("    <input type=\"text\" id=\"s\" class=\"vhl-search-input\" name=\"s\" placeholder=\"" + locate[0] + "\" value=\"" + locate[0] + "\" onfocus=\"if(this.value=='" + locate[0] + "') this.value = '';\" onblur=\"if(this.value=='') this.value = '" + locate[0] + "';\" />\n");
            text = text.concat("    <input type=\"submit\" class=\"vhl-search-submit submit\" value=\"" + locate[0] + "\" />\n");
            text = text.concat("</form>\n");

            text = text.concat("<div class=\"searchItens\">\n");
            text = text.concat("    <span>" + locate[1] + "</span>\n");
            text = text.concat("    <input type=\"radio\" name=\"engine\" checked=\"checked\" value=\"op1\" id=\"search-op1\" /> <label for=\"search-op1\">" + locate[2] + "</label>\n");
            text = text.concat("    <input type=\"radio\" name=\"engine\" value=\"op2\" id=\"search-op2\" /> <label for=\"search-op2\">" + locate[3] + "</label>\n");
            text = text.concat("</div>");

            $("#showSource").val(text);
            $(".alert-success").css({ "visibility": "visible" });
            $("html, body").animate({ scrollTop: $(document).height()-$(window).height() }, "slow");
            //$("html, body").animate({ scrollTop: $("#footer").offset().top }, "slow");
        }
        else
            $(".alert-success").css({ "visibility": "hidden" });

    });

    $(document).on('click','input:text',function(){
        $(this).popover('destroy');
    });

    $(document).on('focus','#inputLang',function(){
        $(this).popover('destroy');
    });
/*
    $('.carousel').carousel({
      interval: false
    });
*/
});

$(document).on('click','.dropdown ul a',function(){
/*
    var cont = $('#total').val();
    var text = $(this).text();
    var name_text = $(this).attr('name');
    var selected = $(this).closest('.dropdown').children('a.dropdown-toggle').text();
    var name_selected = $(this).closest('.dropdown').children('a.dropdown-toggle').attr('name');
    $(this).attr('name', name_selected);
    $(this).closest('.dropdown').children('a.dropdown-toggle').attr('name', name_text);
    //$(this).text(selected);
    //$(this).closest('.dropdown').children('a.dropdown-toggle').html(text + "<b class=\"caret\"></b>");

    for (var i = 1; i <= cont; i++) {
        $('#op'+i).val($('#drop'+i).attr('name'));
    };
*/
    var lang = $(this).attr('name');
    $("form").attr('action','index.php?lang=' + lang);
    $("form").submit();
});
