$(document).ready(() => {

    $(document).ready(function(){
        $('.modal').modal();
      });
              

    const showPokemons = (data) => {
        // console.log(data);
        let name = "";
        data.forEach((element) => {
            name = element.name;
            pokemon(name);
        })
    }

    const showImages = () => {
        $.ajax({
            url: `https://pokeapi.co/api/v2/pokedex/1/`,
            type: 'GET',
            crossDomain: true, 
            datatype: 'json',
        }).done((response) => {
            let getId = response.pokemon_entries;
            console.log(getId);
            getId.forEach((element) => {
                let id = element.entry_number;
                // console.log(element.pokemon_species.name);
                let name = element.pokemon_species.name;
                console.log(id);
                let imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`;
                $('#column-pokemon').append(`<div class="col s2 modal-trigger" id="cont-pokemon" href="#modal1"><img src="${imgUrl}"><p>${name}</p></div>`);
                
            })
          });
    }

    const ajaxPokemon = () => {
        $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon/`,
            type: 'GET',
            crossDomain: true, 
            datatype: 'json',
        }).done((response) => {
            // showPokemons(response.results[1].name);
            showPokemons(response.results);
          });
    }

    showImages();
    ajaxPokemon();

    const pokemon = (name) => {
        $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon/${name}`,
            type: 'GET',
            crossDomain: true, 
            datatype: 'json',
        }).done((response) => {
            // showPokemons(response.results[1].name);
            // console.log(response)
            // showPokemonData(response);
          });

    }


    
    
})