const createAutoComplete =  ({
   root, 
   renderOption, 
   onOptionSelect, 
   inputValue,
  fetchData
  }) => {

root.innerHTML = `
  <label><b>Search</b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;

const input = root.querySelector('input');
const dropdown = root.querySelector('.dropdown');
const resultsWrapper = root.querySelector('.results');


const onInput = async event => {

    const items = await fetchData(event.target.value);
    // closing the dropdown if no result
    if(!items.length){
        dropdown.classList.remove('is-active');
        return;
    }
// end of closig dropdown 
    resultsWrapper.innerHTML= '';
    dropdown.classList.add('is-active');
    for (let item of items){
        const option = document.createElement('a');
        
        option.classList.add('dropdown-item')
        option.innerHTML = renderOption(item);
       
        // selecting one movie and display information about that movies
        option.addEventListener('click', () => {
            dropdown.classList.remove('is-active');// when clicked remove the dropdown
            input.value = inputValue(item);// upadate the iput with the title of the movie
            onOptionSelect(item); // calling movie

        });

        // end of selecting one move and display the information
        resultsWrapper.appendChild(option);
    }

    };
input.addEventListener('input',debounce(onInput, 2000));
// closeing the dropdown search menu when click outside of that menu
document.addEventListener('click', event => {
if(!root.contains(event.target)){
    dropdown.classList.remove('is-active');
}
});
};