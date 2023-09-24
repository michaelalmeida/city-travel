import {SearchForm} from "../../Components/Search";
import {Modal} from "../../Components/Modal";
import {Container} from "../../UI/Container";

export const Home = () => {
  return (
    <Container>
      <Modal>
        <SearchForm />
      </Modal>
    </Container>
  );
};
