global.$ = global.jQuery = require('jquery');
require('bootstrap');

/*
 |--------------------------------------------------------------------------
 | Document Ready Function
 |--------------------------------------------------------------------------
 */

(function(){
  
  'use-strict';
  
  
  var elem,
      // data-fn
      dataFn = $('[data-fn="contacts"]'),
      // data-url
      thisUrl = dataFn.data('url');
  
  
  if (typeof $.table_of_contacts == 'undefined')
    
    $.table_of_contacts = {};
  
  $.table_of_contacts.get = {
    
    init: function() {
      if(dataFn){
        this.getJson();
      }else{
        dataFn.html('No data found.');
      }
    },
    
    /* = Get data
    ------------------------*/
    getJson: function(url){
      
      var self = this;
      
      // loading data before
      dataFn.html('<span class="loading_table">'+
                  'Loading Please Wait ....'+
                  '</span>');
      
      // No ajax cache
      $.ajaxSetup({ cache: false });
      
      // Get json
      $.getJSON(thisUrl, function(data){
        
        // load template
        var out_html = self.tpl(); 
        
        $.each(data,function(i,obj,key,value){  
          // load inner template
          out_html += self.tpl_inner(obj,key);
          
        });
        // close tag
        out_html += '</div>';
        // render templates
        dataFn.html(out_html);
        // error 
      }).error(function(j,t,e){ 
        // render error.
        dataFn.html('<span class="error_table">'+
                    'Error = '+e+
                    '</span>');
        
      });
    },
    
    // head table template
    tpl: function(){
      var html =
          '<div class="box">';
      return html;
    },
    // inner template
    tpl_inner: function(obj){
      
      var  html= '<div class="col-sm-4">'+
          '<div class="report">'+
          '<div class="image-background image" style="background-image: url('+obj.photo+')"></div>'+
          '<p><img class="svg icon-title" src="public/img/icons/23.svg">Nombre Contacto: '+obj.name+'</p>'+
          '<p><img class="svg icon-title" src="public/img/icons/26.svg">Telefono: '+obj.phone+'</p>'+    
          '<p><img class="svg icon-title" src="public/img/icons/09.svg">Observaciones del lugar: '+obj.last+'</p>'+
          '<p><img class="svg icon-title" src="public/img/icons/08.svg">Latitud: '+obj.web+'</p>'+
          '<p><img class="svg icon-title" src="public/img/icons/08.svg">Longitud:'+obj.email+'</p>'+
          '</div>'+
          '</div>';
      return html;
    }
    
  };
  
  // on ready render data
  $(document).ready(function() {
    $.table_of_contacts.get.init();
  });
})().call(this);