
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { 
    Box,
    Stack,
    Button,
    TextField,
} from '@mui/material';

import { PageContainer } from "layout/pageContainer";
import { useAxios } from 'hooks/exports';
import { useAuthUpdate } from 'contexts/exports';


const LoginPage = (props) => {

    const theme = useTheme();
	const styles = stylesheet(theme);
    const updateAuthData = useAuthUpdate();
    const api = useAxios();

    const navigate = useNavigate();
    const [form, setForm] = useState({});
    const fields = ['username', 'password']
    const [errors, setErrors] = useState({});

    const logIn = () => {

        let isError = false;
        
        // Username
        if ( (!form?.username) || (form?.username === '') || (form?.username && form.username.length === 0) ) {
            setErrors( (e) => ({...e, username: 'You must enter a username or email'}) );
            isError = true;
        } else {
            setErrors((e) => { delete e['username']; return e; });
        }

        // Password
        if ( (!form?.password) || (form?.password === '') || (form?.password && form.password.length < 8) ) {
            setErrors( (e) => ({...e, password: 'Password must be at least 8 characters long'}) );
            isError = true;
        } else {
            setErrors((e) => { delete e['password']; return e; });
        }

        if (isError) return;

        let data = structuredClone(form);

        if (form.username.includes('@')) {
            data = {password: data.password, email: data.username};
        };

        api.post("api/token/", JSON.stringify(data))
            .then( res => {
                console.log("Res?.data:", res?.data);
                res?.data && updateAuthData({tokens: res.data});
                setForm({});
                navigate("/", { replace: true });
            })
            .catch( err => {
                if (!err?.response?.data) return;
                if (!err?.response?.status) return 
                setErrors( e => ({...e, ...err?.response?.data}) );
                if (err?.response?.status === 423) {}
            });
    };

    return (
        <PageContainer style={styles.PageContainer}>
            <h1>Admin Login</h1>
            
            <Stack 
                spacing={2} 
                direction="column"
                sx={styles.StackStyle}
            >
                {   
                    Object.keys(errors).filter( (key) => 
                        !fields.includes(key) 
                    ).length > 0 &&
                    <Box 
                        sx={{
                            backgroundColor: theme.palette.error.dark,
                            borderRadius: '.3rem',
                            p: 1,
                            maxHeight: '10rem',
                            overflow: 'hidden',
                        }}
                    >
                        { Object.entries(errors).map( ([key, val], index) => 
                            !fields.includes(key) && <Box key={index}>{val}</Box>
                        )}
                    </Box>
                }
                <TextField 
                    error={ !!errors?.username }
                    helperText={ errors?.username }
                    value={ form.username || '' } 
                    onChange={ (e) => setForm({...form, username: e.target.value}) }
                    label={'username / email'}
                    required={true}
                />
                <TextField 
                    error={ !!errors?.password }
                    helperText={ errors?.password }
                    value={ form.password || '' } 
                    onChange={ (e) => setForm({...form, password: e.target.value}) } 
                    label={'password'}
                    type={"password"}
                    required={true}
                />
                <Button 
                    variant="contained" 
                    onClick={ logIn }
                    disabled={Object.keys(form).length < 2}
                >
                    Login
                </Button>
                
            </Stack>
        </PageContainer>
    )
}

const stylesheet = (theme) => ({
    PageContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    StackStyle: {
        width: '18rem',
        '& > button, & > div': {
            width: '100%',
            color: theme.palette.mode === 'dark' && theme.palette.primary.light,
            fontSize: '1rem',
            '& > input': {
                fontSize: '1.3rem',
            },
            '& > a': {
                color: 'inherit',
                fontSize: 'inherit',
                textDecoration: 'none',
            },
        },
    },
})

export default LoginPage;