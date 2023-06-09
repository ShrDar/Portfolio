const applicances=[{
    name: 'Fridge',
    url: 'https://www.daraz.com.np/refrigerators/?city-electronics&from=wangpu',
    img: 'Pictures/fridge.png'
}, {
    name: 'Washing Machine',
    url: 'https://www.daraz.com.np/washing-machines/?city-electronics&from=wangpu',
    img: 'Pictures/washing-machine.png'
}, {
    name: 'Air Conditioner',
    url: 'https://www.daraz.com.np/air-conditioners/?city-electronics&from=wangpu',
    img: 'Pictures/air-conditioner.png'
}, {
    name: 'Television',
    url: 'https://www.daraz.com.np/smart-tvs/?city-electronics&from=wangpu',
    img: 'Pictures/tv.png'
}, {
    name: 'Microwave',
    url: 'https://www.daraz.com.np/microwaves/?city-electronics&from=wangpu',
    img: 'Pictures/microwave.png'
}, {
    name: 'Vaccum',
    url: 'https://www.daraz.com.np/vacuum-cleaners/?city-electronics&from=wangpu',
    img: 'Pictures/vaccum.png'
}];

let homeHtml='';

applicances.forEach((appliance) => {
    let name = appliance.name;
    let url = appliance.url;
    let img = appliance.img;
    
    const html=`
        <div class="items2">
            <img class='electronic' src="${img}" alt="refrigerator">
            <a href="${url}" target="_blank" rel="nofollow"><button>${name}</button></a>
        </div>
    `
    homeHtml += html;

    
});
document.querySelector('.js-items').innerHTML = homeHtml;

