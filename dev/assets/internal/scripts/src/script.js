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

	// Événement click sur une transaction dans le graphe
	$('[id*="trans-"]').on('click', function(){
		var trans_elem = $(this);
		var trans_elem_id = trans_elem.attr("id");
		var trans_id = trans_elem_id.replace(/^trans-/, '');
		var active_acteur = trans_id.split('-')[0];
		var related_acteur = trans_id.split('-')[1];

		// Active la transaction dans le graphe
		trans_elem
			.addClass('active')
			.siblings()
				.removeClass('active');

		// Active l'acteur relatif
		$('[id*="acteur-'+related_acteur+'"]')
			.addClass('related')
			.find('[id*="cartoon"]')
				.attr('filter', '')
				.end()
			.siblings()
				.removeClass('related');

		// Active le panneau de détails de la transaction
		$('[id*="trans_details-'+trans_id+'"]')
			.addClass('active')
			.siblings()
				.removeClass('active');

		// Active l'acteur émetteur dans les détails de transaction
		$('[id*="emetteur-'+active_acteur+'"]')
			.addClass('active')
			.siblings()
				.removeClass('active');

		// Active l'acteur récepteur dans les détails de transaction
		$('[id*="recepteur-'+related_acteur+'"]')
			.addClass('active')
			.siblings()
				.removeClass('active');

	});

	// Événement click sur un acteur dans le graphe
	$('[id*="acteur-"]').on('click', function(){
		var acteur_elem = $(this);
		var acteur_id = acteur_elem.attr("id").replace(/^acteur-/, '');

		// Désactive les acteurs relatifs
		$('[id*="acteur-"].related').removeClass('related');

		// Active l'acteur
		acteur_elem
			.addClass('active')
			.find('[id*="cartoon"]')
				.attr('filter', '')
				.end()
			.siblings()
				.removeClass('active')
				.find('[id*="cartoon"]')
					.not('[id*="frame"]')
						.attr('filter', 'url("#greyscale")');

		// Désactive les transactions du graphe affichées
		$('[id*="trans-"].shown').removeClass('shown');

		// Active les transactions du groupe
		$('[id*="trans_group-"]')
			.filter('[id*="'+acteur_id+'"]')
				.addClass('active')
				.find('[id*="trans-"]')
					.addClass('shown');

		// Désactive les éléments actifs du panneau de détails
		$('[id*="trans_details-'+trans_id+'"].active, [id*="emetteur-'+active_acteur+'"].active, [id*="recepteur-'+related_acteur+'"].active').removeClass("active");

		// Active l'acteur émetteur et la description du panneau principal
		$('[id*="emetteur-'+active_acteur+'"], [id*="acteur_description-'+acteur_id+'"]').addClass("active");
	});

});