/* Author: Emma Charpentier */
// var svgDoc, linkElm, svgObject, RobertMalade;
var active_acteur, related_acteur;
$(document).ready(function() {

// $(window).load(function () {
	// svgObject = document.getElementById("object-econocircuit");
// alert('LOAD');
//it's important to add an load event listener to the object, as it will load the svg doc asynchronously

	// svgDoc = svgObject.contentDocument;
	// linkElm = svgDoc.createElementNS("http://www.w3.org/1999/xhtml", "link");
	// linkElm.setAttribute("href", "../../../assets/internal/styles/css/main.css");
	// linkElm.setAttribute("type", "text/css");
	// linkElm.setAttribute("rel", "stylesheet");
	// svgDoc.getElementById("svg-econocircuit-vertical").appendChild(linkElm);

	// Robert = svgDoc.getElementById("Robert");
	// RobertMalade = svgDoc.getElementById("Robert-malade");

	// RobertMalade.addEventListener('click', function(){
	// 	RobertMalade.setAttribute('class', 'hidden');
	// }, false);

	// Robert.addEventListener('click', function(){
	// 	RobertMalade.setAttribute('class', '');
	// }, false);

	// svgObject.style.opacity = 1;

// });

	$('[id*="trans-"]').on('click', function(){
		$(this).addClass('active').siblings().removeClass('active');
		related_acteur = $(this).attr('id').replace('-'+active_acteur,'').split('trans-')[1];
		$('[id*="acteur-'+related_acteur+'"]').addClass('related').find('[id*="cartoon"]').attr('filter', '');
		$('[id*="acteur-'+related_acteur+'"]').siblings().removeClass('related');
		console.log(active_acteur,related_acteur);
	});

	$('[id*="acteur-"]').on('click', function(){
		$('[id*="acteur-"]').removeClass('related');
		$(this).addClass('active').find('[id*="cartoon"]').attr('filter', '');
		$(this).siblings().removeClass('active').find('[id*="cartoon"]').not('[id*="frame"]').attr('filter', 'url("#greyscale")');
		active_acteur = $(this).attr('id').split('acteur-')[1];
		$('[id*="trans-"]').filter('.shown').removeClass('shown');
		$('[id*="trans_group-"]').filter('[id*="'+active_acteur+'"]').addClass('active').find('[id*="trans-"]').addClass('shown');
	});

});