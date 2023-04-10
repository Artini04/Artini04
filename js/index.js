'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
githubFetch();
const repo_list = [];
const REPO_GRID = document.getElementById('repos-grid');
function githubFetch() {
    return __awaiter(this, void 0, void 0, function* () {
        const API_URL = 'https://api.github.com/users/artini04/repos';
        const response = yield fetch(API_URL)
            .then((r) => r.json())
            .catch((e) => console.log(e));
        repo_list.push(...response);
        buildRepoGrid();
    });
}
function buildRepoGrid() {
    for (const key in repo_list) {
        const repo = repo_list[key];
        // Skip Github Account Repo
        if (repo.name.includes('Artini04')) {
            continue;
        }
        createGridItem(repo);
    }
}
function createGridItem(obj) {
    return __awaiter(this, void 0, void 0, function* () {
        // Root
        const CONT_ROOT = document.createElement('div');
        CONT_ROOT.classList.add('repo-root');
        const CONT_INFO = createComponent('', { html_tag: 'div', html_class: 'repo-info' });
        CONT_ROOT.appendChild(CONT_INFO);
        // Name
        const CONT_NAME = createComponent(obj.name, { html_tag: 'span', html_class: 'repo-info__name' });
        CONT_INFO.appendChild(CONT_NAME);
        // ID
        const CONT_ID = createComponent(obj.id, { html_tag: 'span', html_class: 'repo-info__id' });
        CONT_INFO.appendChild(CONT_ID);
        // Description
        if (obj.description.length != 0 || !!obj.description) {
            const CONT_DESC = createComponent(obj.description, { html_tag: 'span', html_class: 'repo-info__desc' });
            CONT_INFO.appendChild(CONT_DESC);
        }
        // GIT-TOPICS
        if (obj.topics.length != 0) {
            const CONT_TOPICS = createComponent('', { html_tag: 'div', html_class: 'repo-topics' });
            CONT_ROOT.appendChild(CONT_TOPICS);
            for (const key in obj.topics) {
                const topic = obj.topics[key];
                const CONT_TOPIC = createComponent(topic, { html_tag: 'span', html_class: 'repo-topics__topic' });
                CONT_TOPICS.appendChild(CONT_TOPIC);
            }
        }
        const CONT_LANGS = createComponent('', { html_tag: 'div', html_class: 'repo-langs' });
        CONT_ROOT.appendChild(CONT_LANGS);
        const lang_list = yield getLangs(obj.languages_url);
        const lang_list_property = Object.getOwnPropertyNames(lang_list);
        for (const key in lang_list_property) {
            const language = lang_list_property[key];
            const CONT_LANG = createComponent(language, { html_tag: 'span', html_class: 'repo-langs__lang' });
            CONT_LANGS.appendChild(CONT_LANG);
        }
        // SVN-URL
        const CONT_HTML_URL = createComponentLink(obj.html_url, 'repo-root__link');
        CONT_ROOT.appendChild(CONT_HTML_URL);
        REPO_GRID.appendChild(CONT_ROOT);
    });
}
function createComponent(obj_prop, { html_tag, html_class }) {
    const CONT_COMP = document.createElement(html_tag);
    if (!!html_class)
        CONT_COMP.classList.add(html_class);
    CONT_COMP.innerHTML = obj_prop.toString();
    return CONT_COMP;
}
function createComponentLink(obj_prop, html_class) {
    const LINK = document.createElement('a');
    if (!!html_class)
        LINK.classList.add(html_class);
    LINK.target = '_blank';
    LINK.href = obj_prop.toString();
    return LINK;
}
function getLangs(lang_url) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(lang_url)
            .then((r) => r.json())
            .catch((e) => console.log(e));
        return response;
    });
}
