/**
 * Article provides a simple wrapper for pages that are just basic markup.
 * The only view in the app that has any interactivity (for now) is Plotter,
 * so the other views (Credits, About, and the 404 page), can be much more simply
 * expressed in markdown, and loaded into the Article component for proper styling.
 */

'use strict';

import React from 'react';
import './article.scss';


export default function Article (props) {
    const mdContent = require(`./${props.page}.md`);

    return (
        <article className='article'>
            <div dangerouslySetInnerHTML={{ __html: mdContent }} />
        </article>
    );
}

Article.propTypes = {
    page: React.PropTypes.string
};
