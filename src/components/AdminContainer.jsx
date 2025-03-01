import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DeployContainer from './deploy';
import Marksheet from './Marksheet';
import Header from './Header';
import PropTypes from 'prop-types';
import DnsDid from './DnsDid';
function AdminContainer({signer}){
    return(
        <>
            <Header/>
            <section>
                <div>
                    <h1>Admin</h1>
                </div>
                <Tabs>
                    <TabList>
                        <Tab>Document Store</Tab>
                        <Tab>DNS</Tab>
                        <Tab>Issue Document</Tab>
                    </TabList>
                    <div>
                        <TabPanel>
                            <DeployContainer signer={signer}/>
                        </TabPanel>
                        <TabPanel>
                            <DnsDid/>
                        </TabPanel>
                        <TabPanel>
                            <Marksheet signer={signer} />
                        </TabPanel>
                    </div>
                </Tabs>   
            </section>
        </>
    )
}
AdminContainer.propTypes = {
    signer: PropTypes.any.isRequired,
  };
export default AdminContainer;