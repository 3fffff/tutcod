 #include<stdio.h>

void func(void* ptr_func){
    printf("normal func");
    (*ptr_func)();
}

void callback_func(){
    printf("callback");
}

void  StartSecondaryThread(void* Argument){
    HAL_TIM_Base_Start_IT(&htim3);
    HAL_TIM_Base_Start_IT(&htim2);
    for(;;){
        switch(ulTaskNotifyTake(pdTrue,portMAX_DELAY)){
            case 3:runCalc(0);break;
            case 2:break;
            default:break;
        }
    }
}

void HAL_TIM_PeriodElapsedCallback(TIM_HandleTypeDef *htim){
    BaseType_t xHigherPriorityTaskWoken = pdFalse;
    swith((uint32_t)htim->Instance){
        case(uint32_t)TIM6:
            HAL_IncTIm();break;
        case(uint32_t)TIM2:
            xTaskNotifyFromISR(xThreadHnd1,2,eSetValueWithOverwrite,&xHigherPriorityTaskWoken);
            break;
        case(uint32_t)TIM3:
            xTaskNotifyFromISR(xThreadHnd1,3,eSetValueWithOverwrite,&xHigherPriorityTaskWoken);
            break;
    }
    portYIELD_FROM_ISR(xHigherPriorityTaskWoken);
}
