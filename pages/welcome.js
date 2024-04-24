import selectors from "#selectors/welcome";

export class Welcome {
    hoverOption(option){
        cy.get('p >span>p').eq(option).trigger('mouseover');
    }

exploreOption(option) {
        cy.xpath(selectors.optionButtonDesigner.replace('option',option)).should('be.visible');
    }

assetSetValidationInDesignerProject(assetList=[]){
    let len = assetList.length;
    for (var i = 0; i < len; i++) {
            cy.xpath(selectors.assetVerification.replace('asset',assetList[i])).should('be.visible');
        }
    }
}
