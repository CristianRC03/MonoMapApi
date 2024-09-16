import { CaseModel } from "../../data/models/case-model";
import { CaseDataSource } from "../datasource/case.datasource";
import { EmailService } from "../service/email.service";
import cron from "node-cron";
import { generateCaseEmailTemplate } from "../templates/email.template";


export const emailJob = () => {
    const emailService = new EmailService();
    const caseDatasource = new CaseDataSource();

    cron.schedule('*/10 * * * * *', async () => {
        try {
            const cases = await CaseModel.find({ isSent: false });
            if(!cases.length) {
                console.log('No hay casos pendientes de enviar');
                return;
            }

            console.log(`Procesando ${cases.length} casos`);

            await Promise.all(
                cases.map(async (c) => {
                    const htmlBody = generateCaseEmailTemplate(
                        c.lat,
                        c.lng,
                        c.genre,
                        c.age
                    );

                    await emailService.sendEmail({
                        to: 'beat_criz@hotmail.com',
                        subject: 'Nuevo caso de viruela del mono',
                        htmlBody: htmlBody
                    });
                    console.log(`Email enviado para el caso con ID: ${c._id}`);

                    await caseDatasource.updateCase(c._id.toString(), { ...c, isSent: true });
                    console.log(`Caso actualizado para el ID: ${c._id}`);  
                })
            );
        } catch (error) {
            console.error(error);
        }
    }); 
}