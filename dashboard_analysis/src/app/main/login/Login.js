import React, {Component} from 'react'
import {withStyles, Card, CardContent, Typography, Icon, Tabs, Tab} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {Link, withRouter} from 'react-router-dom';
import classNames from 'classnames';
import JWTLoginTab from './tabs/JWTLoginTab';

const styles = theme => ({
    root : {
        background    : "url('/assets/images/backgrounds/dark-material-bg.jpg') no-repeat",
        backgroundSize: 'cover'
    }
});

class Login extends Component {

    state = {
        tabValue: 0
    };

    handleTabChange = (event, value) => {
        this.setState({tabValue: value});
    };

    render()
    {
        const {classes} = this.props;
        const {tabValue} = this.state;

        return (
            <div className={classNames(classes.root, "flex flex-col flex-1 flex-no-shrink p-24 md:flex-row md:p-0")}>
                <FuseAnimate animation={{translateX: [0, '100%']}}>

                    <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>

                        <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">

                            <Typography variant="h6" className="text-center md:w-full mb-48">INICIAR SESIÓN</Typography>

                            <Tabs
                                value={tabValue}
                                onChange={this.handleTabChange}
                                variant="fullWidth"
                                className="mb-32"
                            >
                                <Tab
                                    icon={<Icon className="h-40 text-40">security</Icon>}
                                    className="min-w-2"
                                    label=""
                                />
                            </Tabs>

                            {tabValue === 0 && <JWTLoginTab/>}

                            <div className="flex flex-col items-center justify-center pt-32">
                                <span className="font-medium">¿No tienes cuenta?</span>
                                <Link className="font-medium" to="/register">Crear cuenta</Link>
                                
                            </div>

                        </CardContent>
                    </Card>
                    </FuseAnimate>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(Login));
