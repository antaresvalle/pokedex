$(document).ready(() => {
    const showPokemons = () => {
        $.ajax({
            // /js/pokedex.json  https://pokeapi.co/api/v2/pokedex/1/
            url: `https://pokeapi.co/api/v2/pokedex/1/`,
            type: 'GET',
            crossDomain: true,
            datatype: 'json',
        }).done((response) => {
            let getId = response.pokemon_entries;
            // console.log(getId);
            getId.forEach((element) => {
                let id = element.entry_number;
                // console.log(element.pokemon_species); 
                let name = element.pokemon_species.name;
                // console.log(id);
                let imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
                $('#column-pokemon').append(`<div class="col s4 m2 modal-trigger" id="cont-${name}" href="#modalDetails"><img id="imgPkm-${name}" src="${imgUrl}"><p>${name}</p></div>`);
                pokemonInfo(id, name, imgUrl);
                $(`#imgPkm-${name}`).click((evt) => {
                    feedModal(evt);
                });
            })
        });
    }
    
    const pokemonInfo = (id, name, imgUrl) => {
        // https://pokeapi.co/api/v2/pokemon/${id}
        $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon/${id}`,  /*`/js/bulbasaur.json` */
            type: 'GET',
            crossDomain: true,
            datatype: 'json',
        }).done((response) => {
            // console.log(response);
            let typesArray = setPokemonData(response.types, 'type');
            let abilitiesArray = setPokemonData(response.abilities, 'ability');
            let movesArray = setPokemonData(response.moves, 'move');
            let statsArray = setPokemonData(response.stats, 'stat');

            let height = response.height;
            let weight = response.weight;
            let containerName = `#imgPkm-${name}`;

            $(containerName).attr('data-name', name);
            $(containerName).attr('data-img', imgUrl);
            $(containerName).attr('data-height', height);
            $(containerName).attr('data-weight', weight);

            setPokemonAttr(typesArray, 'type', containerName);
            setPokemonAttr(abilitiesArray, 'ability', containerName);
            setPokemonAttr(movesArray, 'move', containerName, 4);
            setPokemonAttr(statsArray, 'stat', containerName);

            // console.log($(containerName)[0].dataset);
        });
    }

    function setPokemonData(data, type) {
        let dataAttrSet = [];

        data.forEach((element) => {
            let attribute = element[type].name;
            dataAttrSet.push(attribute)
        });

        return dataAttrSet;
    }

    function setPokemonAttr(attrArray, dataType, container, limit) {
        let length;

        limit > 0 ? length = limit : length = attrArray.length;

        for (let i = 0; i < length; i++) {
            $(container).attr(`data-${dataType}-${i}`, attrArray[i]);
        }
    }

    function feedModal(trigger) {
        $('#modalDetails').html('');
        console.log(trigger.target.dataset);
        let allTypes = trigger.target.dataset['type-0'];

        if (trigger.target.dataset['type-1']) {
            allTypes += `, ${trigger.target.dataset['type-1']}` 
        }

        let templateModal = `
            <div class="modal-content">
                <img id="imagePokemon" src="${trigger.target.dataset.img}">
                <h2 id="name">${trigger.target.dataset.name}</h2>
                <p id="height"><strong>Height:</strong> ${trigger.target.dataset.height}</p>
                <p id="weight"><strong>Weight:</strong> ${trigger.target.dataset.weight}</p>
                <p id="abilities"><strong>Abilities:</strong> ${trigger.target.dataset['ability-0']}, ${trigger.target.dataset['ability-1']}</p>
                <p id="types"><strong>Types:</strong> ${allTypes}</p>
            </div>
            <div class="modal-footer">
                <a href="#!" class="modal-close waves-effect waves-green btn-flat">Ok</a>
            </div>`;
        $('#modalDetails').append(templateModal);
        $('.modal').modal();
    }

    showPokemons();
})