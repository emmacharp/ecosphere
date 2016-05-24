/* Author: Emma Charpentier */
// var svgDoc, linkElm, svgObject, RobertMalade;
var active_acteur, related_acteur, active_trans, n;
$(document).ready(function() {


	// Génère un nombre entier entre 0 et 99 inclusifs
	n= parseInt(Math.random()*100);

	// Si on ne veut pas que n puisse être égal à 0
	n = 0;
	while (n == 0) {
	    n = parseInt(Math.random()*100);
	}

	// Génère un nombre entre 0 et 9 inclusivement et le multiplie par 1,10 ou 100 choisi aléatoirement
	n = parseInt(Math.random()*100)*Math.pow(10,parseInt(Math.random()*3));

	// Pareil, pour s'assurer que n != 0
	n = 0;
	while (n == 0) {
	    n = parseInt(Math.random()*100)*Math.pow(10,parseInt(Math.random()*3));
	}

	$('[id="niveau-2"]').fadeOut(0);

	// Événement click sur une transaction dans le graphe
	$('[id*="trans-"]').on('click', function(){
		var trans_elem = $(this);
		var trans_elem_id = trans_elem.attr("id");
		var trans_id = trans_elem_id.replace(/^trans-/, '');
		active_trans = trans_id.replace(/[0-9]+$/,'');
		var emetteur_acteur = trans_id.split('-')[0];
		var recepteur_acteur = trans_id.split('-')[1].replace(/[0-9]+$/,'').split('-')[0];
		var related_acteur = trans_id.replace(''+active_acteur+'','').replace('-','').replace(/[0-9]+$/,'').split('-')[0];

		console.log(active_acteur,related_acteur);

		$('[id*="dummy-number"]').each(function(){
			if($(this).is('[id*="dummy-number-1"]')){
				n = parseInt(Math.random()*100);
				$(this).html(n);
				$(this).append('%');
			}
			if($(this).is('[id*="dummy-number-3"]')){
				n = parseInt(Math.random()*100);
				$(this).html(n);
				$(this).prepend('.');
			}
			if($(this).is('[id*="dummy-number-4"]')){
				n = parseInt(Math.random()*10);
				$(this).children('text:first-child').html(n);
			}
		});

		// Active la transaction dans le graphe
		trans_elem
			.addClass('active')
			.siblings()
				.removeClass('active');

		$('[id*="to-"].shown, [id*="trans-montant"].shown, [id*="trans_info"].shown').removeClass("shown");

		// Active l'acteur relatif
		$('[id*="acteur-'+related_acteur+'"]')
			.addClass('related')
			.find('[id*="cartoon"], g[clip-path]')
				.attr('filter', '')
				.end()
			.siblings()
				.removeClass('related');

		// Active le panneau de détails de la transaction
		$('[id*="trans_info_group-'+active_acteur+'"] [id*="trans_info-'+active_trans+'"], [id*="trans-montant"]')
			.addClass('shown')
			.siblings()
				.removeClass('shown');

		// Active l'acteur émetteur dans les détails de transaction
		// $('[id*="active-'+active_acteur+'"]')
		// 	.addClass('shown active')
		// 	.siblings()
		// 		.attr('class', '');


		if(emetteur_acteur == active_acteur){
			$('[id*="to-right"]')
				.addClass('shown')
		} else {
			$('[id*="to-left"]')
				.addClass('shown')
		}

		// if(recepteur_acteur == active_acteur){
		// 	$('[id*="recepteur-'+recepteur_acteur+'"]')
		// 		.addClass('active')
		// } else {
		// 	$('[id*="recepteur-'+recepteur_acteur+'"]')
		// 		.addClass('related')
		// }

		// Active l'acteur récepteur dans les détails de transaction
		$('[id*="related-'+related_acteur+'"]')
			.addClass('shown related')
			.siblings()
				.attr('class', '');

	});

	// Événement click sur un acteur dans le graphe
	$('[id*="acteur-"]').on('click', function(){
		var acteur_elem = $(this);
		var acteur_id = acteur_elem.attr("id").replace(/^acteur-/, '');
		active_acteur = acteur_id;

		// Désactive les acteurs relatifs
		$('[id*="acteur-"].related').removeClass('related');
		$('[id*="chosen-"].shown').removeClass('shown')
		$('[id*="chosen-'+active_acteur+'"]').addClass('shown')

		// Active l'acteur
		acteur_elem
			.addClass('active')
			.find('[id*="cartoon"], g[clip-path]')
				.attr('filter', '')
				.end()
			.siblings()
				.removeClass('active')
				.find('[id*="cartoon"], g[clip-path]')
					.not('[id*="frame"]')
						.attr('filter', 'url("#greyscale")');

		// Désactive les transactions du graphe affichées
		$('[id*="trans-"].shown').removeClass('shown');
		$('[id*="to-"].shown').removeClass("shown");

		// Active les transactions du groupe
		$('[id*="trans_group-"]')
			.filter('.active')
				.removeClass('active')
				.find('.active')
					.removeClass('active')
					.end()
				.end()
			.filter('[id*="'+acteur_id+'"]')
				.addClass('active')
				.find('[id*="trans-"]')
					.addClass('shown');

		// Désactive les éléments actifs du panneau de détails
		$('[id*="trans_info-'+active_trans+'"].shown, [id*="trans-montant"].shown, [id*="active-"], [id*="related-"]').removeClass("shown");

		// Active l'acteur émetteur et la description du panneau principal
		$('[id*="active-'+active_acteur+'"], [id*="acteur_description-'+acteur_id+'"]').addClass("shown");
	});

	$('[id*="dummy-number-1"]').on('click', function(){
		$('[id="niveau-2"]').fadeIn();
		$('[id="niveau-1"]').css({transform: 'scaleX(.90)'})
		.children('rect').css({'fill': '#fafafa'});
	});

	$('[id*="role-1"]').on('click', function(){
		$('[id*="circuit"] [id*="ramq"]').css({opacity: '0'});
		$('[id*="circuit"] [id*="pharmacien"]').css({opacity: '0'});
		$('[id="ui"]').children('text').html('L’assurance-vie');
		// $('[id*="trans-assureur_prive-pharmacien1"]').css({opacity: '0'});
		$('body').css({'background-color': '#CCC'});
	});

	$('[id*="role-2"]').on('click', function(){
		$('[id*="circuit"] [id*="ramq"]').attr('style', '');
		$('[id*="circuit"] [id*="pharmacien"]').attr('style', '');
		// $('[id*="trans-assureur_prive-pharmacien1"]').css({opacity: '1'});
		$('[id="ui"]').children('text').html('L’assurance-médicaments');
		$('body').attr('style', '');
	});

	// $('[id*="blbala"]').hover(
	// 	function(){
	// 		$(this).children('path').css({fill: '#ffffff'});
	// 	},
	// 	function(){
	// 		$(this).children('path').attr('style', '');
	// 	});

});