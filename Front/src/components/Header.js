import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header() {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href={"/"}>
          <img alt='Logo' src='../assets/Logo.png'/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href={"/adopt"}>입양게시판</Nav.Link>
            <Nav.Link href={"/review"}>입양후기</Nav.Link>
            <NavDropdown title="진단하기" id="basic-nav-dropdown">
              <NavDropdown.Item href={"/simulation"}>시뮬레이션</NavDropdown.Item>
              <NavDropdown.Item href={"/checklist"}>체크리스트</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href={"/login"}>로그인</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
