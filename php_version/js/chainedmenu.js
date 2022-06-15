// Chained Menu

// Copyright Xin Yang 2004
// Web Site: www.yxScripts.com
// EMail: m_yangxin@hotmail.com
// Last Updated: 2004-08-23
// This script is free as long as the copyright notice remains intact.
// Adapted by Jaime Galvez (jgalvez@lcc.uma.es)

var _disable_empty_list=false;
var _hide_empty_list=false;

if (typeof(disable_empty_list)=="undefined") { disable_empty_list=_disable_empty_list; }
if (typeof(hide_empty_list)=="undefined") { hide_empty_list=_hide_empty_list; }

var cs_goodContent=true, cs_M="M", cs_L="L", cs_curTop=null, cs_curSub=null;
var cs_info_object=null, cs_edit_subject_button=null, cs_aftertest=null, cs_aftersessions=null;
var cs_iscolaborative_radiobtn=null, cs_canbecolaborative=null, cs_maxscore=null; 
cs_content=new Array();

function cs_findOBJ(obj,n) {
   for (var i=0; i<obj.length; i++) {
      if (obj[i].name==n) {
         return obj[i];
      }
   }
   return null;
}

function cs_findContent(n) { 
   return cs_findOBJ(cs_content,n);
}

function cs_findM(m,n) {
   if (m.name==n) { return m; }

   var sm=null;
   for (var i=0; i<m.items.length; i++) {
      if (m.items[i].type==cs_M) {
         sm=cs_findM(m.items[i],n);
         if (sm!=null) { break; }
      }
   }
   return sm;
}

function cs_findMenu(n) { 
   return (cs_curSub!=null && cs_curSub.name==n)?cs_curSub:cs_findM(cs_curTop,n); 
}

function cs_contentOBJ(n,obj){ 
   this.name=n;
   this.menu=obj;
   this.lists=new Array();
   this.prevcontent = null;
} 

function cs_topmenuOBJ(tm) {
   this.name=tm;
   this.items=new Array();
   this.df=0;
   this.addM=cs_addM;
   this.addL=cs_addL;
}

function cs_submenuOBJ(dis,link,sub) {
   this.name=sub;
   this.type=cs_M;
   this.dis=dis;
   this.link=link;
   this.df=0;
   
   var x=cs_findMenu(sub);
   this.items=x==null?new Array():x.items;

   this.addM=cs_addM;
   this.addL=cs_addL;
}

function cs_linkOBJ(dis,link,info,colab,aftertest,aftersessions,maxscore) { 
   this.type=cs_L;
   this.dis=dis;
   this.link=link;
   this.info=info;
   var canbecolaborative = 0;
   if (typeof(colab)=="string" && colab=="true"){
      canbecolaborative = 1;
   }else if (typeof(colab)=="string" && colab!="false"){
      canbecolaborative = -1;
   }else if (typeof(colab)!="string"){
      canbecolaborative = colab;
   }
   this.colab=canbecolaborative;
   this.aftertest=aftertest;
   this.aftersessions=aftersessions;
   this.maxscore=maxscore;
}

function cs_addM(dis,link,sub) { 
   this.items[this.items.length]=new cs_submenuOBJ(dis,link,sub); 
}

function cs_addL(dis,link,info,colab,aftertest,aftersessions,maxscore) { 
   this.items[this.items.length]=new cs_linkOBJ(dis,link,info,colab,aftertest,aftersessions,maxscore);
}

function cs_showMsg(msg) {
   window.status=msg;
}

function cs_badContent(n) {
   cs_goodContent=false;
   cs_showMsg("["+n+"] Not Found.");
}

function cs_optionOBJ(text,value) { 
   this.text=text; this.value=value;
}

function cs_emptyList(list) { 
   for (var i=list.options.length-1; i>=0; i--) {
      list.options[i]=null;
   } 
}

function cs_refreshList(list,opt,previousSelectedValue) {
   cs_emptyList(list);
   var selectedIndex = 0;
   
   for (var i=0; i<opt.length; i++) {
      list.options[i]=new Option(opt[i].text, opt[i].value);
      if (opt[i].value==previousSelectedValue){
         selectedIndex = i;
      }
   }

   if (opt.length>0) {
      list.selectedIndex=selectedIndex;
   }
   return selectedIndex;
}

function cs_getOptions(menu) {
   var opt=new Array();
   for (var i=0; i<menu.items.length; i++) {
      opt[i]=new cs_optionOBJ(menu.items[i].dis, menu.items[i].link);
   }
   return opt;
}

function cs_disableColab() {
   cs_canbecolaborative.value=0;
   cs_iscolaborative_radiobtn[0].checked=false;
   cs_iscolaborative_radiobtn[1].checked=false;
   cs_iscolaborative_radiobtn[0].disabled=true;
   cs_iscolaborative_radiobtn[1].disabled=true;
}

function cs_setColabValue(canbecolaborative, iscolaborative) {
   cs_canbecolaborative.value=canbecolaborative;
   if (canbecolaborative==0){
      //Solo el primer radio button puede estar activado
      cs_iscolaborative_radiobtn[0].disabled=false;
      cs_iscolaborative_radiobtn[0].checked=true;
      cs_iscolaborative_radiobtn[1].disabled=true;
   }else if (canbecolaborative>0 && iscolaborative==0){
      //Radio button primero activado
      cs_iscolaborative_radiobtn[0].disabled=false;
      cs_iscolaborative_radiobtn[0].checked=true;
      cs_iscolaborative_radiobtn[1].disabled=false;
   }else if (canbecolaborative>0 && iscolaborative>0){
      //Radio button segundo activado
      cs_iscolaborative_radiobtn[0].disabled=false;
      cs_iscolaborative_radiobtn[1].disabled=false;
      cs_iscolaborative_radiobtn[1].checked=true;
   }else{
      cs_disableColab();
   }
}

function stripslashes(str) {
   str=str.replace(/\\'/g,'\'');
   str=str.replace(/\\"/g,'"');
   str=str.replace(/\\\\/g,'\\');
   str=str.replace(/\\0/g,'\0');
   str=str.replace(/\n/g,' ');
   return str;
}

function cs_updateListGroup(content,index,selectedIndex,prevcontent) {
   var i=0, curItem=null, menu=content.menu;
   
   if (index==0 && selectedIndex==0){
      //Se ha seleccionado la opcion "elija una asignatura (primer select)
      if (cs_edit_subject_button!=null){
      	cs_edit_subject_button.disabled=true;
      }
      cs_info_object.value="";
      cs_disableColab();
   }
   while (i<index) {
      menu=menu.items[content.lists[i++].selectedIndex];
   }
   
   if (menu.items[selectedIndex].type==cs_M && index<content.lists.length-1) {
      var previousSelectedValue = cs_getValue(prevcontent,"idtest",menu.items[selectedIndex].df);
      if (cs_edit_subject_button!=null){
      	cs_edit_subject_button.disabled=false;
      }
      if (prevcontent==null){
         cs_info_object.value="";
         cs_disableColab();
      }
      var selectedIndex = cs_refreshList(content.lists[index+1], cs_getOptions(menu.items[selectedIndex]), previousSelectedValue);
      
      if (index+1<content.lists.length) {
         if (disable_empty_list) {
            content.lists[index+1].disabled=false;
         }
         if (hide_empty_list) {
            content.lists[index+1].style.display="";
         }
         cs_updateListGroup(content,index+1,selectedIndex,prevcontent);
      }
   }else {
      for (var s=index+1; s<content.lists.length; s++) {
         cs_emptyList(content.lists[s]);

         if (disable_empty_list) {
            content.lists[s].disabled=true;
         }
         if (hide_empty_list) {
            content.lists[s].style.display="none";
         }
      }
   }
}

function cs_initListGroup(content,prevcontent) {
   var previousSelectedValue = cs_getValue(prevcontent,"idsubject",content.menu.df);
   if (prevcontent==null){
       cs_info_object.value="";
       cs_disableColab();
       cs_aftertest.value="";
       cs_aftersessions.value="";
       cs_maxscore.value="";
   }else{
       var info=cs_getValue(prevcontent,"testinfo","");
       cs_info_object.value = stripslashes(htmlspecialchars_decode(info));
       var canbecolaborative = cs_getValue(prevcontent, "canbecolaborative", 0);
       var iscolaborative = cs_getValue(prevcontent, "iscolaborative", 0);
       cs_setColabValue(canbecolaborative, iscolaborative);
       var aftertest = cs_getValue(prevcontent, "aftertest",0);
       cs_aftertest.value=aftertest;
       var aftersessions = cs_getValue(prevcontent, "aftersessions",0);
       cs_aftersessions.value=aftersessions;
       var maxscore = cs_getValue(prevcontent, "maxscore",0);
       cs_maxscore.value=maxscore;
   }
   
   var selectedIndex = cs_refreshList(content.lists[0], cs_getOptions(content.menu), previousSelectedValue);
   cs_updateListGroup(content,0,selectedIndex,prevcontent);
}

function cs_updateList() {
   var content=this.content;
   for (var i=0; i<content.lists.length; i++) {
      if (content.lists[i]==this) {
         if (i<content.lists.length-1) {
            cs_updateListGroup(content,i,this.selectedIndex,null);
         }else{
            var index=content.lists[0].selectedIndex;
            var items=content.menu.items[index];
            for (var j=1; j<i; j++){
               index=content.lists[j].selectedIndex;
               items=items.items[index];
            }
            var item=items.items[this.selectedIndex];
            cs_info_object.value=stripslashes(item.info);
            cs_setColabValue(item.colab,0);
            cs_aftertest.value=item.aftertest;
            cs_aftersessions.value=item.aftersessions;
            cs_maxscore.value=item.maxscore;
         }
      }
   }
}

function addListGroup(n,tm) {
   if (cs_goodContent) {
      cs_curTop=new cs_topmenuOBJ(tm);
      cs_curSub=null;

      var c=cs_findContent(n);
      if (c==null) {
         cs_content[cs_content.length]=new cs_contentOBJ(n,cs_curTop);
      }else {
         delete(c.menu); c.menu=cs_curTop;
      }
   }
}

function addList(n,dis,link,sub,df) {
   if (cs_goodContent) {
      cs_curSub=cs_findMenu(n);

      if (cs_curSub!=null) {
         cs_curSub.addM(dis,link||"",sub);
         if (typeof(df)!="undefined") { cs_curSub.df=cs_curSub.items.length-1; }
      }else {
         cs_badContent(n);
      }
   }
}

function addOption(n,dis,link,info,colab,aftertest,aftersessions,maxscore,df) {
   if (cs_goodContent) {
      cs_curSub=cs_findMenu(n);

      if (cs_curSub!=null) {
         cs_curSub.addL(dis,link||"",info,colab,aftertest, aftersessions, maxscore);
         if (typeof(df)!="undefined") { cs_curSub.df=cs_curSub.items.length-1; }
      }else {
         cs_badContent(n);
      }
   }
}

/**
 * Parametros esperados:
 * 0) nombre del menu
 * 1) elemento de formulario que contendra el radiobutton del modo del test
 * 2) elemento de formulario que contendra una cadena indicando el modo del test
 * 3) elemento de formulario para mostrar la informacion del test
 * 4) elemento de formulario para mostrar la solucion / corrección al final del test
 * 5) elemento de formulario para mostrar la solución / corrección tras finalizar la sesión
 * 6) elemento de formulario para acceder al boton de editar un test
 * 7) elemento de formulario que contendra el primer select (asignatura)
 * 8) elemento de formulario que contendra el segundo select (test)
 * 9) array que contendra informacion sobre el contenido previo
 * 
 */
function initListGroup(n) {
   var _content=cs_findContent(n), count=0;
   if (_content!=null) {
      var content=new cs_contentOBJ("cs_"+n,_content.menu);
      cs_content[cs_content.length]=content;
      if (arguments.length<9){
         alert("Error in number of arguments, it must be greater than nine.");
         return;
      }
      cs_iscolaborative_radiobtn=arguments[1];
      cs_iscolaborative_radiobtn[0].content=content;
      cs_iscolaborative_radiobtn[1].content=content;
      cs_canbecolaborative=arguments[2];
      cs_info_object=arguments[3];
      cs_aftertest=arguments[4];
      cs_aftersessions=arguments[5];
      cs_maxscore=arguments[6];
      cs_edit_subject_button=arguments[7];
      if (cs_edit_subject_button!=null){
      	cs_edit_subject_button.disabled=true;
      }
      for (var i=8; i<initListGroup.arguments.length; i++) {
         if (arguments[i]!=null){
	         if (typeof(arguments[i])=="object" && arguments[i].tagName && arguments[i].tagName=="SELECT") {
	            content.lists[count]=arguments[i];
	            arguments[i].onchange=cs_updateList;
	            arguments[i].content=content; arguments[i].index=count++;
	         }else if (arguments[i] instanceof Array) {
	         	content.prevcontent=arguments[i];
	         }
         }
      }
      if (content.lists.length>0) {
         cs_initListGroup(content,content.prevcontent);
      }
   }
}

function resetListGroup(n) {
   var content=cs_findContent("cs_"+n);
   if (content!=null && content.lists.length>0) {
      cs_initListGroup(content,null);
   }
   cs_info_subject.value="";
   if (cs_edit_subject_button!=null){
   	cs_edit_subject_button.disabled=true;
   }
}

/**
* Esta funci&oacute;n se encarga de dividir una cadena de texto que contiene 
* cada opci&oacute;n a incluir en los diferentes selects. El formato de la 
* cadena es el siguiente: 
* <i>orden1;parametros1;orden2;parametros2;.....;ordenN;parametrosN</i><br>
* -<i>parametrosi</i> es una secuencia de valores separados por comas, por ejemplo:
* valor1,valor2,,valor4<br>
* -<i>ordeni</i> puede ser:
* <ul>
*      <li>"LG" (para ejecutar el comando addListGroup). En este caso, el 
*             n&uacute;mero de par&aacute;metros esperados es 2.</li>
*      <li>"L" (para ejecutar el comando addList), en este caso, el n&uacute;mero 
*             de par&aacute;metros esperados es 4.</li>
*      <li>"O" (para ejecutar el comando addOption), en este caso, el 
*             n&uacute;mero de par&aacute;metros esperados puede ser 4 o 5.</li>
* </ul>
*/
function resetInfo(cadena, invocation_result, iscolaborativeradio, canbecolaborative, testinfo, aftertest, aftersessions, maxscore, editsubject, idsubject, idtest, prevcontent){
   cs_goodContent=true, cs_M="M", cs_L="L", cs_curTop=null, cs_curSub=null;
   cs_content=new Array();
   
   var documentoXML=loadXMLString(cadena);
   procesarXML(documentoXML,invocation_result);
         	
   initListGroup('chainedmenu', iscolaborativeradio, canbecolaborative, testinfo, aftertest, aftersessions, maxscore, editsubject, idsubject, idtest, prevcontent);
}


//---------------------------------------------------------------------
// ------ Funciones necesarias para el manejo de la información previa 
// ------ (esta se maneja en un array asociativo)
//---------------------------------------------------------------------

function cs_getValue(prevcontent, name, defaultvalue) {
   if ((prevcontent instanceof Array) && prevcontent!=null && prevcontent[name]!=null) {
      return prevcontent[name];
   }else{
      return defaultvalue;
   }
}

//---------------------------------------------------------------------
// ------ Funciones usadas para cargar contenido directamente sobre
// ------ los select y elementos de información
//---------------------------------------------------------------------

/**
* Esta funci&oacute;n busca un elemento concreto en un select y devuelve
* su &iacute;ndice. 
* @return Devuelve el &iacute;ndice del elemento si lo encuentra o -1 en otro
* caso 
*/
function findIdInSelet(select, selectId){
   var encontrado = false;
   var indice = 0;
   while (indice < select.length && !encontrado){
      if (select.options[indice].value == selectId){
         encontrado=true;
      }else{
         indice = indice + 1;
      }
   }
   if (!encontrado){
      return -1;
   }else{
      return indice;
   }
}

/**
* Funci&oacute;n que rellena el contenido de los objetos javascript (selects,
* inputs, etc) con los valores previamente existentes.
**/
function fillPreviousSelectContent(infoContainer, selectSubject, previousIdSubject, selectTest, previousTestId, subjectMissedMsg, testMissedMsg){
   var subjetIndex = findIdInSelet(selectSubject, previousIdSubject);
   if (subjetIndex==-1){
      infoContainer.innerHTML="<b>"+subjectMissedMsg+"</b>";
   }else{
      selectSubject.selectedIndex=subjetIndex;
      var testIndex = findIdInSelet(selectTest, previousTestId);
      if (testIndex==-1){
         infoContainer.innerHTML="<b>"+testMissedMsg+"</b>";
      }else{
         selectTest.selectedIndex=testIndex;
      }
   }
}

//---------------------------------------------------------------------
// ------ Funciones XML necesarias para procesar la respuesta de SIETTE
//---------------------------------------------------------------------

function loadXMLString(txt) {
   try { //Internet Explorer
      xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
      xmlDoc.async="false";
      xmlDoc.loadXML(txt);
      return(xmlDoc); 
   }catch(e){
      try { //Firefox, Mozilla, Opera, etc.
         parser=new DOMParser();
         xmlDoc=parser.parseFromString(txt,"text/xml");
         return(xmlDoc);
      }catch(e) {
         alert(e.message)
      }
   }
   return(null);
}

function getAjaxResult(xmlDoc){
   var ajaxResults = xmlDoc.getElementsByTagName("ajaxresult");
   if (ajaxResults==null || ajaxResults.length==0){
      return null;
   }
   return ajaxResults[0].childNodes[0].nodeValue;
}

function getTestDefaultString(xmlDoc){
   var defaultTests = xmlDoc.getElementsByTagName("testdefault");
   if (defaultTests.length==0){
      return null;
   }
   return defaultTests[0].childNodes[0].nodeValue;
}

function getSubjectDefaultString(xmlDoc){
   var defaultSubjects = xmlDoc.getElementsByTagName("subjectdefault");
   if (defaultSubjects.length==0){
      return null;
   }
   return defaultSubjects[0].childNodes[0].nodeValue;
}

function procesarXML(xmlDoc,invocation_result){
   
   addListGroup("chainedmenu", "Asignaturas");
   
   var container = document.getElementById(invocation_result);
   var ajaxresult = getAjaxResult(xmlDoc);
   if (ajaxresult!=null){
      container.innerHTML = ajaxresult;
   }
   
   var defectoAsigs = getSubjectDefaultString(xmlDoc);
   var defectoTests = getTestDefaultString(xmlDoc);
   if (defectoAsigs==null || defectoTests == null){
      alert("Error processing XML file, default string for selecting tests and subjects is missing");
   }else{
      addOption("Asignaturas", defectoAsigs, -1, "", "", "", "", 1);

      asignaturas = xmlDoc.getElementsByTagName("subject");
      procesarAsignaturas(asignaturas, defectoTests);
   }
}

function procesarAsignaturas(asignaturas, defectoTests){
   if (asignaturas.length==0){
      ;//No se hace nada
   }

   var i;
   for (i=0;i<asignaturas.length;i++){
      var asignatura=asignaturas[i];
      var idasig = asignatura.getAttribute("id");
      var nombresasig = asignatura.getElementsByTagName("name");
      var nombreasig = "";
      if (nombresasig.length >0){
         nombreasig = nombresasig[0].childNodes[0].nodeValue;
      }else{
         alert('Error processing XML, the subject name is missing');
      }
      var nombrecortoasig = nombreasig.slice(0,50);
      addList("Asignaturas", nombrecortoasig, idasig, "ConjuntoTests"+i);
      addOption("ConjuntoTests"+i, defectoTests, -1, "", -1, "", "", 1);
      
      var tests = asignatura.getElementsByTagName("test");
      procesarTests(tests,i);
   }
}

function procesarTests(tests,numasig){
   if (tests.length==0){
      ;
   }
   var j;
   for (j=0;j<tests.length;j++){
      var test = tests[j];
      var idtest = test.getAttribute("id");
      var colaborativo = test.getAttribute("collaborative");
      var soluciontrastest = test.getAttribute("aftertest");
      var soluciontrassesiones = test.getAttribute("aftersessions");
      var maximapuntuacion = test.getAttribute("maxscore");
      var nombrestest = test.getElementsByTagName("name");
      var nombretest="";
      if (nombrestest.length >0){
         nombretest = nombrestest[0].childNodes[0].nodeValue;
      }else{
         alert('Error processing XML, the test name is missing');
      }
      var descripcionestest = test.getElementsByTagName("description");
      var descripciontest="";
      if (descripcionestest.length >0){
         descripciontest = descripcionestest[0].childNodes[0].nodeValue;
      }else{
         alert('Error processing XML, test description is missing');
      }
      
      var testinfo = nombretest+": "+descripciontest;
      var nombrecortotest = nombretest.slice(0,50);
      //Llamar a la funcion del test
      addOption("ConjuntoTests"+numasig, nombrecortotest, idtest, testinfo, colaborativo, soluciontrastest, soluciontrassesiones, maximapuntuacion);
   }
}


//---------------------------------------------------------------------
// ------ Funciones para usar htmlspecialchars_decode de PHP
//---------------------------------------------------------------------


function get_html_translation_table(table,quote_style){
	var entities={},histogram={},decimal=0,symbol='';
	var constMappingTable={},constMappingQuoteStyle={};
	var useTable={},useQuoteStyle={};
	useTable=(table?table.toUpperCase():'HTML_SPECIALCHARS');
	useQuoteStyle=(quote_style?quote_style.toUpperCase():'ENT_COMPAT');
	constMappingTable[0]='HTML_SPECIALCHARS';
	constMappingTable[1]='HTML_ENTITIES';
	constMappingQuoteStyle[0]='ENT_NOQUOTES';
	constMappingQuoteStyle[2]='ENT_COMPAT';
	constMappingQuoteStyle[3]='ENT_QUOTES';
	if(!isNaN(useTable)){
	useTable=constMappingTable[useTable];
	}
	if(!isNaN(useQuoteStyle)){
		useQuoteStyle=constMappingQuoteStyle[useQuoteStyle];
	}
	if(useTable=='HTML_SPECIALCHARS'){
		entities['38']='&amp;';
		if(useQuoteStyle!='ENT_NOQUOTES'){
			entities['34']='&quot;';
		}
		if(useQuoteStyle=='ENT_QUOTES'){
			entities['39']='&#039;';
		}
		entities['60']='&lt;';
		entities['62']='&gt;';
	}else if(useTable=='HTML_ENTITIES'){
		entities['38']='&amp;';
		if(useQuoteStyle!='ENT_NOQUOTES'){
			entities['34']='&quot;';
		}
		if(useQuoteStyle=='ENT_QUOTES'){
			entities['39']='&#039;';
		}
		entities['60']='&lt;';entities['62']='&gt;';entities['160']='&nbsp;';
		entities['161']='&iexcl;';entities['162']='&cent;';entities['163']='&pound;';
		entities['164']='&curren;';entities['165']='&yen;';entities['166']='&brvbar;';
		entities['167']='&sect;';entities['168']='&uml;';entities['169']='&copy;';
		entities['170']='&ordf;';entities['171']='&laquo;';entities['172']='&not;';
		entities['173']='&shy;';entities['174']='&reg;';entities['175']='&macr;';
		entities['176']='&deg;';entities['177']='&plusmn;';entities['178']='&sup2;';
		entities['179']='&sup3;';entities['180']='&acute;';entities['181']='&micro;';
		entities['182']='&para;';entities['183']='&middot;';entities['184']='&cedil;';
		entities['185']='&sup1;';entities['186']='&ordm;';entities['187']='&raquo;';
		entities['188']='&frac14;';entities['189']='&frac12;';entities['190']='&frac34;';
		entities['191']='&iquest;';entities['192']='&Agrave;';entities['193']='&Aacute;';
		entities['194']='&Acirc;';entities['195']='&Atilde;';entities['196']='&Auml;';
		entities['197']='&Aring;';entities['198']='&AElig;';entities['199']='&Ccedil;';
		entities['200']='&Egrave;';entities['201']='&Eacute;';entities['202']='&Ecirc;';
		entities['203']='&Euml;';entities['204']='&Igrave;';entities['205']='&Iacute;';
		entities['206']='&Icirc;';entities['207']='&Iuml;';entities['208']='&ETH;';
		entities['209']='&Ntilde;';entities['210']='&Ograve;';entities['211']='&Oacute;';
		entities['212']='&Ocirc;';entities['213']='&Otilde;';entities['214']='&Ouml;';
		entities['215']='&times;';entities['216']='&Oslash;';entities['217']='&Ugrave;';
		entities['218']='&Uacute;';entities['219']='&Ucirc;';entities['220']='&Uuml;';
		entities['221']='&Yacute;';entities['222']='&THORN;';entities['223']='&szlig;';
		entities['224']='&agrave;';entities['225']='&aacute;';entities['226']='&acirc;';
		entities['227']='&atilde;';entities['228']='&auml;';entities['229']='&aring;';
		entities['230']='&aelig;';entities['231']='&ccedil;';entities['232']='&egrave;';
		entities['233']='&eacute;';entities['234']='&ecirc;';entities['235']='&euml;';
		entities['236']='&igrave;';entities['237']='&iacute;';entities['238']='&icirc;';
		entities['239']='&iuml;';entities['240']='&eth;';entities['241']='&ntilde;';
		entities['242']='&ograve;';entities['243']='&oacute;';entities['244']='&ocirc;';
		entities['245']='&otilde;';entities['246']='&ouml;';entities['247']='&divide;';
		entities['248']='&oslash;';entities['249']='&ugrave;';entities['250']='&uacute;';
		entities['251']='&ucirc;';entities['252']='&uuml;';entities['253']='&yacute;';
		entities['254']='&thorn;';entities['255']='&yuml;';
	}else{
		throw Error("Table: "+useTable+' not supported');
		return false;
	}
	for(decimal in entities){
		symbol=String.fromCharCode(decimal);
		histogram[symbol]=entities[decimal];
	}
	return histogram;
}


function htmlspecialchars_decode(string,quote_style){
	var histogram={},symbol='',tmp_str='',entity='';
	tmp_str=string.toString();
	if(false===(histogram=get_html_translation_table('HTML_SPECIALCHARS',quote_style))){
		return false;
	}
	delete(histogram['&']);
	histogram['&']='&amp;';
	for(symbol in histogram){
		entity=histogram[symbol];
		tmp_str=tmp_str.split(entity).join(symbol);
	}
	return tmp_str;
}
	