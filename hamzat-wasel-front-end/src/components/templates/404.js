import React from 'react';
import './style.css';

export default class NotFound extends React.Component
{
    render()
    {
        return(
                <div id="notfound">
                <div class="notfound">
                    <div class="notfound-404">
                        <h1>4<span>0</span>4</h1>
                    </div>
                    <h2>the page you requested could not found</h2>
                </div>
            </div>
        )
    }
}
