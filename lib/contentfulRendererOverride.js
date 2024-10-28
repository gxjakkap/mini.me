'use client'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import Radium from 'radium'
import { Component } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

function getHeadingHash(text){
    return encodeURIComponent(text.toLowerCase().replaceAll(" ", "-"))
}

function Heading2({children, ...props}){
    const headingHash = getHeadingHash(children[0])
    return <h2 id={headingHash} {...props}><a className='hover:underline' href={`#${headingHash}`}>{children}</a></h2>
}

function Heading3({children, ...props}){
    const headingHash = getHeadingHash(children[0])
    return <h3 id={headingHash} {...props}><a className='hover:underline' href={`#${headingHash}`}>{children}</a></h3>
}

function Pr({children, ...props}) {
    return (<p {...props}>{children}</p>)
}

// why tf radium needed a class component?
class Hpl extends Component {
    render() {
        const style = {
            color: 'rgb(59 130 246)', 
            overflowWrap: 'break-word'
        }
        return (
            <a style={style} href={this.props.href} target='_blank' rel='noopener noreferrer'>{this.props.children}</a>
        )
    }
}

function Im(inp) {
    const {file, title} = inp.fields
    // eslint-disable-next-line @next/next/no-img-element
    //return <img style={{marginTop: '1.25rem', marginBottom: '1.25rem', maxWidth: '50vw', maxHeight: '550px', marginLeft: 'auto', marginRight: 'auto' /* , borderRadius: '0.5rem' */}} src={file.url} alt={title} />
    return (
        <LazyLoadImage
            style={{marginTop: '1.25rem', marginBottom: '1.25rem', maxWidth: '50vw', maxHeight: '550px', marginLeft: 'auto', marginRight: 'auto' /* , borderRadius: '0.5rem' */}} 
            src={`https://${file.url}`} 
            alt={title}
        />
    )
}

const overrideOptions = {
    [BLOCKS.PARAGRAPH]: {
        component: Pr,
        props: {
            style: {marginBottom: '1rem', fontSize: '1rem', lineHeight: '1.5rem'}
        }
    },
    [BLOCKS.EMBEDDED_ASSET]: {
        image: {
            component: Im
        }
    },
    [INLINES.HYPERLINK]: {
        component: Radium(Hpl),
        /* props: {
            className: "hover:text-primary",
            style: { textDecorationLine: 'underline', overflowWrap: 'break-word' }
        } */
    },
    [BLOCKS.HEADING_2]: {
        component: Heading2,
        props: {
            style: {marginBottom: '0.75rem', marginTop: '2.5rem', fontSize: '1.75rem', lineHeight: '2.5rem', fontWeight: 700}
        }
    },
    [BLOCKS.HEADING_3]: {
        component: Heading3,
        props: {
            style: {marginBottom: '0.75rem', marginTop: '2.5rem', fontSize: '1.5rem', lineHeight: '2.25rem', fontWeight: 600}
        }
    },
}

export default overrideOptions
