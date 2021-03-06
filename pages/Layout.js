import React, { Component } from 'react';
import Footer from 'grommet/components/Footer';
import App from 'grommet/components/App';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';
import Anchor from 'grommet/components/Anchor';
import Article from 'grommet/components/Article';
import firebase from 'firebase/app';
import 'firebase/auth';
import { connect } from 'react-redux';

import DesktopHeader from '../components/Header';
import MobileHeader from '../components/MobileHeader';
import { cookieUpdateAuth } from '../redux/actions';

class Layout extends Component {
    renderFooter() {
        return (
            <Footer
                justify="between"
                size="small"
                style={{
                    padding: '0% 1.5% 0% 1.5%',
                    margin: '2.5vh 0 1.5vh 0',
                }}
            >
                <Title>
                    <s />
                    Sage Prosthetics
                </Title>
                <Box direction="row" align="center" pad={{ between: 'medium' }}>
                    <Paragraph margin="none">© 2019 Sage Prosthetics</Paragraph>
                    <Anchor href="/privacy-policy">Privacy Policy</Anchor>
                    <Anchor href="/contact">Contact</Anchor>
                    <Anchor href="/">About</Anchor>
                </Box>
            </Footer>
        );
    }

    renderMobileFooter() {
        return (
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
            >
                <Box direction="row" align="center" justify="center">
                    <Paragraph margin="none">© 2019 Sage Prosthetics</Paragraph>
                    <Anchor href="/privacy-policy">Privacy Policy</Anchor>
                    <Anchor href="/contact">Contact</Anchor>
                    <Anchor href="/">About</Anchor>
                </Box>
            </div>
        );
    }

    componentDidMount() {
        console.log('header check');
        firebase.auth().onAuthStateChanged((authUser) => {
            this.props.cookieUpdateAuth(authUser);
        });
    }

    render() {
        return (
            <App style={{ maxWidth: '100vw' }}>
                <Article
                    style={{
                        maxWidth: '100vw',
                        padding: '0px',
                    }}
                >
                    {this.props.desktop ? (
                        <DesktopHeader
                            recipients={this.props.recipients}
                            projects={this.props.projects}
                            page={this.props.page}
                            container={this}
                            isAuthenticated={this.props.isAuthenticated}
                        />
                    ) : (
                        <MobileHeader
                            recipients={this.props.recipients}
                            projects={this.props.projects}
                            page={this.props.page}
                        />
                    )}

                    <div style={{ minHeight: this.props.desktop ? '81vh' : '60vh' }}>
                        {this.props.children}
                    </div>

                    {this.props.desktop ? this.renderFooter() : this.renderMobileFooter()}
                </Article>
            </App>
        );
    }
}

const mapStateToProps = (state) => {
    const { recipients, projects, page, isAuthenticated } = state;
    return {
        recipients,
        projects,
        page,
        isAuthenticated,
    };
};

export default connect(mapStateToProps, { cookieUpdateAuth })(Layout);
