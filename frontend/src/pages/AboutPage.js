import AboutImage from './AboutImage.png';
import ExampleImage from './exampleImage.png';
import {useApp} from '../components/appContext.js'

const AboutPage = () => {
    const {setCurrentPage} = useApp();

    return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="max-w-7xl mx-auto px-6 space-y-32">
        <section className="mb-16">
          <div className="w-full rounded-2xl overflow-hidden mb-8">
            <img 
              src={ExampleImage} 
              alt="AI Soccer Analytics" 
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto text-center">
            Visualizing the power of AI-driven tracking: tracking movements and making non-intrusive annotations
          </p>
        </section>
        <section className="text-center">
          <h2 className="text-5xl font-bold mb-8">Highlighting made easy.</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Our AI technology provides comprehensive tracking and marking of the desired player in just three easy steps.
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">1. Submit a Video</h3>
            <p className="text-gray-400">
              Submit any video showcasing your skills. Best results shown for videos sub 45 seconds and desired player needs to be visible in first frame.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">2. Pick your player</h3>
            <p className="text-gray-400">
              Our website will grab the first frame of the video and provide the user with an image showing each player and their designated ID. Pick the ID that matches the player you want to track.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">3. Highlight </h3>
            <p className="text-gray-400">
              Once the player ID is selected, hit the 'Start Processing' button and the player will be marked with a red triangle indicator, frame by frame. The processed video will show up at the bottom of the page, ready to download.
            </p>
          </div>
        </section>

        <section className="text-center pb-24">
          <h2 className="text-5xl font-bold mb-8">Ready to showcase your game?</h2>
          <button 
            onClick={() => setCurrentPage('login')}
            className="px-8 py-4 bg-white text-black rounded-full text-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Start Now
          </button>
        </section>
      </div>
    </div>
    )
};


export default AboutPage;