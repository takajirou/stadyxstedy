import styles from "@styles/componentStyles/edit/EditField.module.scss";
import TextField from "@mui/material/TextField";

export default function EditFeld() {
    return (
        <div className={styles.EditFieldWrap}>
            <div className={styles.EditObjective}>
                <TextField
                    fullWidth
                    label="大目標設定"
                    defaultValue="Default Value"
                    helperText="最大50文字"
                    inputProps={{
                        maxLength: 50,
                        style: { fontSize: "1.5rem" },
                    }}
                    sx={{
                        "& label": {
                            fontSize: "1.5rem",
                        },
                        "& .MuiFormHelperText-root": {
                            fontSize: "1.2rem",
                        },
                    }}
                />
            </div>
            <div className={styles.EditObjective}>
                <TextField
                    fullWidth
                    label="週目標設定"
                    defaultValue="Default Value"
                    helperText="最大50文字"
                    inputProps={{
                        maxLength: 50,
                        style: { fontSize: "1.5rem" },
                    }}
                    sx={{
                        "& label": {
                            fontSize: "1.5rem",
                        },
                        "& .MuiFormHelperText-root": {
                            fontSize: "1.2rem",
                        },
                    }}
                />
            </div>
        </div>
    );
}
