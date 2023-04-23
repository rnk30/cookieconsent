import { globalObj } from '../global';
import { createNode, handleFocusTrap, isString, addDataButtonListeners } from '../../utils/general';
import { createConsentModal } from './consentModal';
import { createPreferencesModal } from './preferencesModal';
import { DIV_TAG } from '../../utils/constants';
import { handleRtlLanguage } from '../../utils/language';

export const createMainContainer = () => {
    const dom = globalObj._dom;

    if(!dom._ccMain){
        dom._ccMain = createNode(DIV_TAG);
        dom._ccMain.id = 'cc-main';

        handleRtlLanguage();

        let root = globalObj._state._userConfig.root;

        if(root && isString(root))
            root = document.querySelector(root);

        // Append main container to dom
        (root || dom._document.body).appendChild(dom._ccMain);
    }
};

/**
 * @param {import('../global').Api} api
 */
export const generateHtml = async (api) => {

    addDataButtonListeners(null, api, createPreferencesModal, createMainContainer);

    if(globalObj._state._invalidConsent)
        createConsentModal(api, createMainContainer);

    if(!globalObj._config.lazyHtmlGeneration)
        createPreferencesModal(api, createMainContainer);

    handleFocusTrap();
};

export * from './consentModal';
export * from './preferencesModal';