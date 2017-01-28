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
