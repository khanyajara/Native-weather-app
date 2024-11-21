import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({


    container: {
        flex: 1,
        height:'190%',
        width: '100%',
       
         
        
    },
    centeredContext: {
        alignItems:'center',
        
        paddingVertical: 50,
        paddingHorizontal: 20,
       
        borderColor: 'black',
        height: '99%',
        width: '99%'

    },
    Title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',

        
    },
    input: {
        height: 40,
        width:'80%',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5, 
        paddingHorizontal: 10,
        marginBottom: 20,
        color: '#000',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'black',
        padding: 10,
        width: 120,
        height: 40,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        marginLeft: 30,
        
    },
     buttonText: {
        color: 'white',
        marginLeft: 30,
        
    },
    WeatherInfo: {
        marginTop:-190,
        alignItems: 'center',
        width: '50%'
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0a0a0a',
        marginTop:10,
        flexDirection: 'column',
        flexWrap: 'wrap'
    }, 
    Subheading: {
        fontSize: 16,
        fontWeight :'bold',
        color: '#0a0a0a',
        marginTop:10,
    },
    weatherText: {
        color: '#0a0a0a',
        fontSize:36,
        justifyContent: 'center',
        marginBottom: 8,
        flexDirection: 'column',
    },
    gradient: {
        flex: 1,
        height: '100%',
        width: '100%',
         position: 'absolute',
      },
      scrollView:{
        flex:1,
        width: '100%',
        marginTop: -369,
        
      },
     
})