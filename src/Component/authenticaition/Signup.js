import { Input } from '@mui/material';
import React from 'react';
import './login'

const Signup = () => {
    return (
        <div className="container" >
            <div className="row">
                <div className="col-md-3">

                </div>

                <div className="col-md-6 main">

                    <form action="/sign_up" method="post">

                        <h1> Signup form </h1>

                        <Input
                            className="box"
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Name"
                            required
                        />

                        <Input
                            className="box"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="E-Mail "
                            required
                        />

                        <Input
                            className="box"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password "
                            required
                        />

                        <Input
                            className="box"
                            type="text"
                            name="phone"
                            id="phone"

                            placeholder="Phone Number "
                            required
                        />
                        <Input
                            type="submit"
                            id="submitDetails"
                            name="submitDetails"
                            value="Submit"
                        />
                    </form>
                </div>
                <div className="col-md-3">
                </div>

            </div>
        </div>
    )
};

export default Signup;