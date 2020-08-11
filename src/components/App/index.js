import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Header from '../Header';
import SVGSpriteSheet from '../SVGSpriteSheet';
import Button from '../Button';
import Ideas from '../Ideas';
import Footer from '../Footer';
import Registration from '../Registration';
import { scrollElToCenter } from '../../support/handlers';
import IdeaInfoOverlay from '../IdeaInfoOverlay';
import JoinIdeaOverlay from '../JoinIdeaOverlay';
import AddNewIdea from '../AddNewIdea';
import Schedule from '../Schedule';
import Rules from '../Rules';
import SuccessOveray from '../SuccessOverlay';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllIdeas } from './actions';
import memberService from '../../services/member';
import ideaService from '../../services/idea';

const App = ({
  ideas,
  dispatch,
  loading,
  error
}) => {
  const [showSuccessOverlay, setShowContactOverlay] = useState(false);
  const [showJoinIdeaOverlay, setShowJoinIdeaOverlay] = useState(false);
  const [showAddIdeaOverlay, setShowAddIdeaOverlay] = useState(false);
  const [showIdeaInfoOverlay, setShowIdeaInfoOverlay] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState();
  const [errorMessage, setErrorMessage] = useState();

  [ideas, loading, error] = useSelector((state) => [
    state.appReducer.ideas,
    state.appReducer.loading,
    state.appReducer.error
  ]);

  dispatch = useDispatch;

  const onCloseSuccessOverlay = useCallback(() => {
    onCloseSuccessOverlay(false);
  }, []);

  const onCloseJoinIdeaOverlay = useCallback(() => {
    setShowJoinIdeaOverlay(false);
  }, []);

  const onCloseIdeaInfoOverlay = useCallback(() => {
    setShowIdeaInfoOverlay(false);
  }, []);

  const onCloseAddIdeaOverlay = useCallback(() => {
    setShowAddIdeaOverlay(false);
  }, []);

  const shouldOpenSuccessOverlay = useCallback(() => {
    setShowAddIdeaOverlay(false);
    setShowIdeaInfoOverlay(false);
    setShowJoinIdeaOverlay(false);
    setShowContactOverlay(true);
  }, []);

  const shouldOpenAddIdeaOverlay = useCallback(() => {
    setShowAddIdeaOverlay(true);
  }, []);

  const _onOpenJoinIdeaOverlay = useCallback((idea) => {
    setSelectedIdea(idea);
    setShowJoinIdeaOverlay(true);
  }, []);

  const _onOpenIdeaInfoOverlay = useCallback((idea) => {
    setSelectedIdea(idea);
    setShowIdeaInfoOverlay(true);
  }, []);

  const scrollTo = useCallback(() => {
    scrollElToCenter('registration');
  }, []);

  useEffect(() => {
    dispatch(fetchAllIdeas());
    setInterval(() => {
      document.querySelector('.Hack-guy').classList.remove('animate');
    }, 1800);

    setInterval(() => {
      document.querySelector('.App-Main-Section-Logo').classList.remove('animate');
    }, 1000);
  }, []);

  const onSubmitJoinIdeaForm = useCallback(
    (event) => {
      const formData = new FormData(event.target);
      const data = {
        id: formData.get('id'),
        member: {
          firstName: formData.get('firstName'),
          lastName: formData.get('lastName'),
          email: formData.get('email'),
          position: formData.get('position')
        }
      };

      memberService.post(data)
        .then(() => {
          dispatch(fetchAllIdeas());
          shouldOpenSuccessOverlay();
          setTimeout(() => {
            onCloseSuccessOverlay();
          }, 2000);
        })
        .catch((errorResponse) => {
          errorResponse.then((err) => {
            setErrorMessage(err.message);
          });
        });
    }, []);

  const onSubmitAddIdeaForm = useCallback((event) => {
    const formData = new FormData(event.target);
    const data = {
      name: formData.get('name'),
      description: formData.get('description')
    };
    ideaService.post(data)
      .then(() => {
        dispatch(fetchAllIdeas());
        shouldOpenSuccessOverlay();
        setTimeout(() => {
          onCloseSuccessOverlay();
        }, 2000);
      })
      .catch((errorResponse) => {
        errorResponse.then((err) => {
          setErrorMessage(err.message);
        });
      });
  }, []);

  return (
    <div className="App">
      <div className="Hack-guy animate"/>
      <section id="about" className="App-Main-Section">
        <div className="App-Main-Section-Container">
          <Header />
          <div className="App-Main-Section-Left">
            <div className="App-Main-Section-Logo animate">
              <div className="App-Main-Section-Left-Container">
                <Button label="Go to registration"
                  type="isActionFilled"
                  onClick={ scrollTo }/>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Registration
        onOpenAddIdeaOverlay={
          shouldOpenAddIdeaOverlay
        }
        onOpenJoinIdeaOverlay={
          _onOpenJoinIdeaOverlay
        }/>
      <Ideas
        onOpenJoinIdeaOverlay={
          _onOpenJoinIdeaOverlay
        }
        onOpenIdeaInfoOverlay={
          _onOpenIdeaInfoOverlay
        }
        ideas={
          ideas
        }
        loading={
          loading
        }
        error={
          error
        }
        onClickAddIdeaBtn={
          shouldOpenAddIdeaOverlay
        }/>
      <section id="schedule" className="Schedule-Section">
        <Schedule />
      </section>
      <section id="inspiration" className="Inspiration">
        <h1 className="App-Section-Title">Inspiration</h1>
      </section>
      <section id="rules">
        <h1 className="App-Section-Title">Rules</h1>
        <Rules />
      </section>
      <SVGSpriteSheet />
      <Footer/>
      { showIdeaInfoOverlay
        && <IdeaInfoOverlay
          onClose={
            onCloseIdeaInfoOverlay
          }
          content={
            selectedIdea
          }
        />
      }
      {
        showJoinIdeaOverlay
        && <JoinIdeaOverlay
          onClose={
            onCloseJoinIdeaOverlay
          }
          ideas={
            ideas
          }
          selectedIdea={
            selectedIdea
          }
          onSubmit={
            onSubmitJoinIdeaForm
          }
          error={
            errorMessage
          }
        />
      }
      {
        showSuccessOverlay
        && <SuccessOveray
          onClose={
            onCloseSuccessOverlay
          }
        />
      }
      {
        showAddIdeaOverlay
        && <AddNewIdea
          onClose={
            onCloseAddIdeaOverlay
          }
          error={
            errorMessage
          }
          onSubmit={
            onSubmitAddIdeaForm
          }
        />
      }
    </div >
  );
};

export default App;