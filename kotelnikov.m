clear all, close all
T=5e-3;% длительность сигнала
Td=0.125e-3; % период дискретизации
fd=1/Td;
t=0:Td:T;
s=(t<=0.003).*(t+0.003)+(t>0.003&t<=0.005).*(-2*t+0.006);
Td2=Td/10; 
fd2=1/Td2;
N=50;
sa=zeros(1,fd2/fd*N+1); % массив для аналогового сигнала 
j=1;
for iv=0:1:fd2/fd*N
   for i=1:length(s)
     f(i)=s(i)*mysinc(pi/Td*(iv*Td2-(i-1)*Td));
     sa(j)=sa(j)+f(i);
   end
   j=j+1;
end
plot(t,s), grid % исходный дискретизированный сигнал
figure,
ta=(0:fd2/fd*N)*Td2;
plot(ta,sa), grid % "аналоговый" сигнал
 
function otvet=mysinc(x)
 if x==0 
     otvet=1; 
  else
    otvet=sin(x)/x;
 end
end
