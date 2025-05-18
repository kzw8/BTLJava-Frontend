// src/components/Layout/Footer.jsx

import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export default function Footer() {
    return (
        <footer className="bg-dark text-light pt-5 pb-3">
            <Container>
                <Row className="gy-4">
                    {/* Cột 1 */}
                    <Col md={3}>
                        <h6 className="text-uppercase">Our World</h6>
                        <ul className="list-unstyled">
                            <li><a href="#!" className="text-light">About us</a></li>
                            <li><a href="#!" className="text-light">Collections</a></li>
                            <li><a href="#!" className="text-light">Environmental philosophy</a></li>
                            <li><a href="#!" className="text-light">Artist collaborations</a></li>
                        </ul>
                    </Col>

                    {/* Cột 2 */}
                    <Col md={3}>
                        <h6 className="text-uppercase">Assistance</h6>
                        <ul className="list-unstyled">
                            <li><a href="#!" className="text-light">Contact us</a></li>
                            <li><a href="#!" className="text-light">Size Guide</a></li>
                            <li><a href="#!" className="text-light">Shipping Information</a></li>
                            <li><a href="#!" className="text-light">Returns & Exchanges</a></li>
                            <li><a href="#!" className="text-light">Payment</a></li>
                        </ul>
                    </Col>

                    {/* Cột 3 */}
                    <Col md={3}>
                        <h6 className="text-uppercase">Careers</h6>
                        <ul className="list-unstyled">
                            <li><a href="#!" className="text-light">Jobs</a></li>
                        </ul>
                    </Col>

                    {/* Cột 4 */}
                    <Col md={3}>
                        <h6 className="text-uppercase">Sign up to our newsletter</h6>
                        <Form className="mt-3">
                            <Form.Group controlId="footerNewsletter">
                                <Form.Control
                                    type="email"
                                    placeholder="Email address"
                                    className="mb-2 bg-transparent text-light border-secondary"
                                />
                            </Form.Group>
                            <Button variant="outline-light" size="sm" className="w-100">
                                Subscribe
                            </Button>
                        </Form>
                    </Col>
                </Row>

                <hr className="border-secondary my-4" />

                <div className="text-center small">
                    © {new Date().getFullYear()} Copyright:&nbsp;
                    <a href="https://mdbootstrap.com" className="text-light text-decoration-none">
                        MDBootstrap.com
                    </a>
                </div>
            </Container>
        </footer>
    );
}
