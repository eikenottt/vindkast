let rutiner = `<ol>
                        <li>
                            <p>Følgende kan låne: staben ved Institutt for informasjons- og medievitenskap, studenter ved instituttet,
                            på grunnlag av faglig begrunnelse, andre ved UiB etter særlig avtale for et avgrenset tidsrom
                            eller for et avgrenset prosjekt.</p>
                        </li>
                        <li>
                            <p>Bestillinger vil bli effektuert hver arbeidsdag mellom klokken 14:00 og 15:00.</p>
                        </li>
                        <li>
                            <p>Ansatte ved institittet får filmen lagt i posthyllen, studenter og andre får tilbakemelding om hvor og
                            når filmen kan hentes.</p>
                        </li>
                        <li>
                            <p>For alt utlån gjelder en generell regel om lånetid på 1 uke, som kan forlenges med ytterlige en uke.
                            Ønskes en film lånt over en
                            lengre periode må dette begrunnes, og hver enkelt forespørsel vil bli vurdert.</p>
                        </li>
                        <li>
                            <p>Film skal leveres tilbake i posthyllen merket <strong>retur av film</strong></p>
                        </li>
                    </ol>`

if (document.location.href.includes("rutiner.html")) {
    document.write(`
                <div>
                    ${rutiner}
                </div>`);
}
else {
    document.write(`
<input type="checkbox" id="sidebox">
    <label for="sidebox" class="whitebox-l">
        <span class="whitebox"></span>
    </label>
<label for="sidebox" class="sidebox-label">Rutiner</label>
            <section id="routine">
                <label for="sidebox" class="sidebox-x">X</label>
                <div>
                    <h2>Rutiner ved lån</h2>
                    ${rutiner}
                </div>
            </section>`);
}
